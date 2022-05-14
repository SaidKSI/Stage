import React from 'react'

export default function Bill() {
  return (
    <div>
        <table className="body-wrap">
        <tbody><tr>
            <td />
            <td className="container" width={600}>
              <div className="content">
                <table className="main" width="100%" cellPadding={0} cellSpacing={0}>
                  <tbody><tr>
                      <td className="content-wrap aligncenter">
                        <table width="100%" cellPadding={0} cellSpacing={0}>
                          <tbody><tr>
                              <td className="content-block">
                                <h2>Thanks for using our app</h2>
                              </td>
                            </tr>
                            <tr>
                              <td className="content-block">
                                <table className="invoice">
                                  <tbody><tr>
                                      <td>Anna Smith<br />Invoice #12345<br />June 01 2015</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <table className="invoice-items" cellPadding={0} cellSpacing={0}>
                                          <tbody><tr>
                                              <td>Service 1</td>
                                              <td className="alignright">$ 20.00</td>
                                            </tr>
                                            <tr>
                                              <td>Service 2</td>
                                              <td className="alignright">$ 10.00</td>
                                            </tr>
                                            <tr>
                                              <td>Service 3</td>
                                              <td className="alignright">$ 6.00</td>
                                            </tr>
                                            <tr className="total">
                                              <td className="alignright" width="80%">Total</td>
                                              <td className="alignright">$ 36.00</td>
                                            </tr>
                                          </tbody></table>
                                      </td>
                                    </tr>
                                  </tbody></table>
                              </td>
                            </tr>
                            <tr>
                              <td className="content-block">
                                <a href="#">View in browser</a>
                              </td>
                            </tr>
                            <tr>
                              <td className="content-block">
                                Company Inc. 123 Van Ness, San Francisco 94102
                              </td>
                            </tr>
                          </tbody></table>
                      </td>
                    </tr>
                  </tbody></table>
                <div className="footer">
                  <table width="100%">
                    <tbody><tr>
                        <td className="aligncenter content-block">Questions? Email <a href="mailto:">support@company.inc</a></td>
                      </tr>
                    </tbody></table>
                </div></div>
            </td>
            <td />
          </tr>
        </tbody></table>
    </div>
  )
}
