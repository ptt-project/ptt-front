import Document, { NextScript, Head, Main, Html } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <base href="/"></base>
          <title>Riode - React eCommerce Template</title>
          <link rel="icon" href="images/icons/favicon.png" />
          {/* <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900"
          /> */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" type="text/css" href="vendor/riode-fonts/riode-fonts.css" />
          <link rel="stylesheet" type="text/css" href="vendor/fontawesome-free/css/all.min.css" />
          <link rel="stylesheet" type="text/css" href="vendor/owl-carousel/owl.carousel.min.css" />
        </Head>
        <body>
          <Main />
          <script src="./js/jquery.min.js"></script>
          <NextScript />
        </body>
      </Html>
    )
  }
}
