import { Footer, Header } from '@button-inc/button-theme';

export default function DefaultLayout({ children }) {
  return (
    <div className="page-container">
      <Header />
      <main className="content--vertical-center">{children}</main>
    </div>
  )
}
