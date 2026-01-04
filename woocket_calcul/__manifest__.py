{
    'name': "Calculatrice Woocket",
    'version': '19.0.1.0.0',
    'category': 'Extra Tools',
    'summary': "Calculator available in the systray",
    'description': """
Woocket Calculator
==================
This module adds a calculator tool directly in the Odoo systray
(top navigation bar), allowing users to perform quick calculations
without leaving the current screen.
    """,
    'author': "Woocket",
    'website': 'https://www.woocket.com',
    'license': 'LGPL-3',
    'depends': ['base', 'web'],
    'assets': {
        'web.assets_backend': [
            'woocket_calcul/static/src/css/calculator.css',
            'woocket_calcul/static/src/xml/calculator.xml',
            'woocket_calcul/static/src/js/calculator.js',
        ],
    },
    'installable': True,
    'auto_install': False,
    'application': True,
}
