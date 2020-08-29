import React from 'react'
import ReactDom from 'react-dom'
import paypal from 'paypal-checkout'

const PaypalCheckoutButton = ({ order }) => {
    const paypalConf = {
        currency: 'DOP',
        env: 'sandbox',
        client: {
            sandbox: 'AYKg6bBe0t8kTrnwdXAOifGn6xOmsWFsakVAE2DslTwdGDZ626Zuz4mzxFRODzUbsEZaX3VCEb_xIMAo'
        },
        style: {
            label: 'pay',
            size: 'medium',
            shape: 'rect',
            color: 'gold'
        }
    }

    const PayPalButton = paypal.Button.driver('react', { React, ReactDom })

    const payment = (data, actions) => {
        const payment = {
            transactions: {
                amount: {
                    total: order.total,
                    currency: paypalConf.currency
                },
                description: 'Compra en JopiTienda',
                custom: order.customer || '',
                item_list: {
                    items: order.items
                }
            },
            note_to_payer: 'Contáctanos para cualquier aclaración'
        }
        return actions.payment.create({ payment })
    }

    const onAuthorize = (data, actions) => {
        return actions.payment.execute()
            .then(res => {
                console.log(res)
                alert('El pago fue procesado correctamente, ID: ' + res.id)
            })
            .catch(error => {
                console.log(error)
                alert('Ocurrió un error al procesar el pago con PayPal')
            })
    }

    const onError = error => {
        console.log(error)
        alert('El pago no fue realizado, vuelva a intentarlo')
    }

    const onCancel = (data, actions) => {
        alert('pPago no realizado, el usuario canceló el proceso')
    }

    return (
        <PayPalButton 
            env={paypalConf.env}
            client={paypalConf.client}
            payment={(data, actions) => payment(data, actions)}
            onAuthorize={(data, actions) => onAuthorize(data, actions)}
            onCancel={(data, actions) => onCancel(data, actions)}
            onError={(error) => onError(error)}
            style={paypalConf.style}
            commit
            locale='es_MX'
        />
    )
}

export default PaypalCheckoutButton