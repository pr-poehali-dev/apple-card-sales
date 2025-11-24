import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get all available Apple gift cards or specific card by ID
    Args: event - dict with httpMethod, pathParams
          context - object with request_id attribute
    Returns: HTTP response with cards data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    path_params = event.get('pathParams', {})
    card_id = path_params.get('id')
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    try:
        if card_id:
            cur.execute(
                "SELECT id, amount, price, description, available_count FROM cards WHERE id = %s",
                (card_id,)
            )
            row = cur.fetchone()
            
            if not row:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Card not found'}),
                    'isBase64Encoded': False
                }
            
            card = {
                'id': row[0],
                'amount': row[1],
                'price': row[2],
                'description': row[3],
                'available_count': row[4]
            }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(card),
                'isBase64Encoded': False
            }
        else:
            cur.execute(
                "SELECT id, amount, price, description, available_count FROM cards ORDER BY amount"
            )
            rows = cur.fetchall()
            
            cards = [
                {
                    'id': row[0],
                    'amount': row[1],
                    'price': row[2],
                    'description': row[3],
                    'available_count': row[4]
                }
                for row in rows
            ]
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(cards),
                'isBase64Encoded': False
            }
    finally:
        cur.close()
        conn.close()
