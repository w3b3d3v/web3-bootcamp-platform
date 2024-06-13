import Document, { Html, Head, Main, NextScript } from 'next/document'
import { CssBaseline } from '@nextui-org/react'
import React from'react'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles])
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          {CssBaseline.flush()}
          <meta charSet="utf-8" />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
            }}
          ></script>
        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          ></noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument