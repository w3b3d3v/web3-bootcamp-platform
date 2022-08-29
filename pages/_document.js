import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta property="og:title" content="WEB3DEV Bootcamp" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://bootcamp.web3dev.com.br/" />
          <meta
            property="og:description"
            content="Plataforma de bootcamps web3 100% em português!"
          />
          <meta
            property="og:image"
            itemprop="image"
            content="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/web3dev-logo.png?alt=media&token=6365a9fc-5d25-46be-be24-dd9bd0f324fc"
          />
          <meta
            property="og:image:secure_url"
            itemprop="image"
            content="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/web3dev-logo.png?alt=media&token=6365a9fc-5d25-46be-be24-dd9bd0f324fc"
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:alt" content="WEB3DEV Logo" />
          <meta property="og:image:width" content="256" />
          <meta property="og:image:height" content="256" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;700;900&display=swap"
            rel="stylesheet"
          />
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
        <body className="bg-gray-50 dark:bg-black-300">
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
