// One-tap Sign-up API https://cli.re/smart-lock-web
function OneTapSignUp101() {
    const options = {
        supportedAuthMethods: [
            "https://accounts.google.com",
        ],
        supportedIdTokenProviders: [
            { uri: "https://accounts.google.com", clientId: "YOUR_GOOGLE_CLIENT_ID" },
        ]
    }

    // Auto sign-in
    smartlock.retrieve(options).then(handleResult); // disabledAutoSignIn()

    // Auto Sign-up
    smartlock.hint(options).then(handleResult);

    function handleResult(credentials) {
        authenticateWithToken(credentials.idToken)
    }
}

navigator.storage.estimate().then(({usage, quota}) => {
    console.log(`Using ${usage} out of ${quota} bytes.`);
});

// Web Share API - https://developers.google.com/web/updates/2016/09/navigator-share
function WebShare101() {
    const title:string = document.title;
    const text :string = document.title;
    const url  :string = window.location;
    navigator.share({ title, text, url })
    .then(() => console.log("Share done"), (error) => console.error("share error", error));
}

// Web Payments https://www.youtube.com/watch?v=hU89pPBmhds
function WebPayment101() {
    interface IWpOptions {
        requestShipping  ?: boolean,
        requestPayerEmail?: boolean,
        requestPayerPhone?: boolean,
        requestPayerName ?: boolean,
    }
    interface IWpMethodData {
        supportedMethods: string,
    }
    interface IWbpTransactionDetail {
        label: string,
        amount: { 
            currency: "GBP",
            value: string,
        }
    }
    interface IWbpTransactionDetails {
        total: IWbpTransactionDetail,
        displayItems: IWbpTransactionDetail[],
    }

    const methodData = [
        {
            supportedMethods:["basic-card"]
        }, 
        {
            supportedMethods:["https://google.com/pay"]
        }
    ]

    const transactionDetails = {
        total: {
            label: "Purchase Amount",
            amount: { currency: "GBP", value: "24.99" },
        },
        displayItems: [
            { 
                label: "Subtotal",
                amount: { currency: "GBP", value: "10.00" },
            },
            // ...
        ]
    }

    const options = {
        requestShipping  : true,
        requestPayerEmail: true,
        requestPayerPhone: true,
        requestPayerName : true,
    }

    const pr = new PaymentRequest(methodData, transactionDetails, options);
    pr.canMakePayment().then(canMake => {
        if (canMake) {

        } else {
            
        }
    })
    pr.show().then((paymentResponse) => {

        paymentResponse.complete("success").then(() => {

        })
    })
}
