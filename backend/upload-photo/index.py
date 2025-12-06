import json
import os
import boto3
import psycopg2
import uuid
import base64
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Загружает фото в S3 и сохраняет информацию в БД
    Args: event - dict с httpMethod, body (JSON с base64), headers
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict с URL загруженного фото
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        image_base64 = body_data.get('image', '')
        
        if not image_base64:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'No image data'}),
                'isBase64Encoded': False
            }
        
        if ',' in image_base64:
            image_base64 = image_base64.split(',')[1]
        
        image_data = base64.b64decode(image_base64)
        
    except Exception as e:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Parse error: {str(e)}'}),
            'isBase64Encoded': False
        }
    
    file_key = f'gallery/{uuid.uuid4()}.jpg'
    
    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    
    s3.put_object(
        Bucket='files',
        Key=file_key,
        Body=image_data,
        ContentType='image/jpeg'
    )
    
    file_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{file_key}"
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    cur.execute(
        "INSERT INTO gallery_photos (file_key, file_url) VALUES (%s, %s) RETURNING id",
        (file_key, file_url)
    )
    photo_id = cur.fetchone()[0]
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'id': photo_id, 'url': file_url}),
        'isBase64Encoded': False
    }