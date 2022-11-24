import { Footer, Header } from "@button-inc/button-theme";

export default function Layout({ children }) {
  return (
    <div className="page-container">
      <Header />
      <main className="content--vertical-center">{children}</main>
      <Footer className="footer"/>
    </div>
  )
}
