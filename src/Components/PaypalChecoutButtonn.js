import React from 'react';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';
import { useDispatch, useSelector } from 'react-redux' 
import { deleteCartAction, getCartAction } from '../redux/carritoDucks';
import { Redirect } from 'react-router'
import Swal from 'sweetalert2'
import { postOrdenAction } from '../redux/ordenDucks';

const PaypalCheckoutButtonn = ({ order }) => {

    const dispatch = useDispatch()
    const carrito = useSelector(state => state.carritos.cartList)

    const [user, setUser] = React.useState({})

    React.useEffect(() =>{
        const log = localStorage.getItem('user')

        log !== null? setUser(JSON.parse(log)) : setUser({})
    }, [])

  const paypalConf = {
    currency: 'USD',
    env: 'sandbox',
    client: {
      sandbox: 'AYKg6bBe0t8kTrnwdXAOifGn6xOmsWFsakVAE2DslTwdGDZ626Zuz4mzxFRODzUbsEZaX3VCEb_xIMAo',
      production: '--',
    },
    style: {
      label: 'pay',
      size: 'responsive', // small | medium | large | responsive
      shape: 'rect',   // pill | rect
      color: 'black',  // gold | blue | silver | black
    },
  };

  const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

  const payment = (data, actions) => {
    const payment = {
      transactions: [
        {
          amount: {
            total: order.total,
            currency: paypalConf.currency,
          },
          description: 'Compra en JopiPedia',
          custom: order.customer || '',
          item_list: {
            items: order.items
          },
        },
      ],
      note_to_payer: 'Contáctanos para cualquier aclaración sobre tu compra.',
    };

    // console.log(payment);
    return actions.payment.create({
      payment,
    });
  };

  const onAuthorize = (data, actions) => {
    return actions.payment.execute()
      .then(response => {
        console.log(response);
        order.items.forEach(obj => {
          dispatch(deleteCartAction(user.id, obj.sku)) 
        });

        dispatch(getCartAction(user.id))

        let Ar = []
        response.transactions[0].item_list.items.forEach(function(element, i) {
            const o = {
                sku: element.sku,
                name: element.name,
                price: element.price,
                quantity: element.quantity,
                currency: element.currency,
                tax: element.tax
            }

            Ar.push()
        });

        const ord = {
            id: response.id,
            fecha: response.create_time,
            total: response.transactions[0].amount.total,
            usuarioId: user.id,
            productos: JSON.stringify(response.transactions[0].item_list.items)
        }

        //console.log(Ar)
        console.log(ord)
        dispatch(postOrdenAction(user.id, ord))

        Swal.fire(
            'El Pago fue procesado correctamente',
            `ID: ${response.id}`,
            'success'
        )
        return <Redirect to="/" />
      })
      .catch(error => {
        console.log(error);
          /*alert('Ocurrió un error al procesar el pago con Paypal');*/
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrió un error al procesar el pago con Paypal'
          })
      });
  };

  const onError = (error) => {
    /*alert ('El pago con PayPal no fue realizado, vuelva a intentarlo.' );*/
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El pago con PayPal no fue realizado, vuelva a intentarlo.'
      })
  };

  const onCancel = (data, actions) => {
    /*alert( 'El pago con PayPal no fue realizado, el usuario canceló el proceso.' );*/
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El pago con PayPal no fue realizado, el usuario canceló el proceso.'
      })
  };


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
      locale="es_MX"
    />

  );
}

export default PaypalCheckoutButtonn;