import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта на email oleg.berus@mail.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    contact = body.get('contact', '').strip()
    plan = body.get('plan', '').strip()

    if not name or not contact:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'name and contact are required'}
        }

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    sender = 'oleg.berus@mail.ru'
    recipient = 'oleg.berus@mail.ru'

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e6edf3; padding: 32px; border-radius: 12px;">
        <h2 style="color: #7fff00; margin: 0 0 24px;">🧊 Новая заявка — FROST FUEL</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px 0; color: #8b949e; width: 140px;">Имя</td>
                <td style="padding: 10px 0; font-weight: bold;">{name}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #8b949e;">Контакт</td>
                <td style="padding: 10px 0; font-weight: bold;">{contact}</td>
            </tr>
            {"<tr><td style='padding: 10px 0; color: #8b949e;'>Тариф</td><td style='padding: 10px 0; font-weight: bold; color: #7fff00;'>" + plan + "</td></tr>" if plan else ""}
        </table>
        <p style="margin: 24px 0 0; font-size: 12px; color: #8b949e;">Заявка получена с сайта FROST FUEL</p>
    </div>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка: {name}'
    msg['From'] = sender
    msg['To'] = recipient
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(sender, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': {'ok': True}
    }