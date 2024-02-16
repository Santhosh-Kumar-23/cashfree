import React, {useEffect} from 'react';
import {View, SafeAreaView, StatusBar, Button, Text} from 'react-native';
import {
  CFErrorResponse,
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import {
  CFEnvironment,
  CFSession,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFDropCheckoutPayment,
  CFUPIIntentCheckoutPayment,
  CFThemeBuilder,
} from 'cashfree-pg-api-contract';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

const CasfFree = () => {
  useEffect(() => {
    CFPaymentGatewayService.setCallback({
      onVerify(orderID) {
        console.log('success ', orderID);
        // navigation.navigate(NAVIGATION.PaymentSuccess);
      },
      onError(CFErrorResponse, orderID) {
        console.log('failed ', orderID);
        // navigation.navigate(NAVIGATION.PaymentFailed);
      },
    });
    return () => CFPaymentGatewayService.removeCallback();
  }, []);

  const startCheckout = () => {
    try {
      const session = new CFSession(
        'session_dB9yLsRRbRTv2apc5OV8WhUnqFS5g-sy5mPTTjN7Mbq9T5BeyoQ2GCqctTXJcTiQCH7saPHxkO_EQ',
        'AA65TYTYT',
        CFEnvironment.SANDBOX,
      );

      console.log('session', session);
      const paymentModes = new CFPaymentComponentBuilder()
        .add(CFPaymentModes.CARD)
        .add(CFPaymentModes.UPI)
        .add(CFPaymentModes.NB)
        .add(CFPaymentModes.WALLET)
        .add(CFPaymentModes.PAY_LATER)
        .build();
      const theme = new CFThemeBuilder()
        .setNavigationBarBackgroundColor('#E64A19')
        .setNavigationBarTextColor('#FFFFFF')
        .setButtonBackgroundColor('#FFC107')
        .setButtonTextColor('#FFFFFF')
        .setPrimaryTextColor('#212121')
        .setSecondaryTextColor('#757575')
        .build();
      const dropPayment = new CFDropCheckoutPayment(
        session,
        paymentModes,
        theme,
      );
      CFPaymentGatewayService.doPayment(dropPayment);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button
        title="Pay Now"
        onPress={() => {
          startCheckout();
        }}
      />
    </View>
  );
};

export default CasfFree;
