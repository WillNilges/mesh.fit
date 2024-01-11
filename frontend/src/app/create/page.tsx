import Content from '/src/components/Content/Content'
import CreateForm from '/src/components/CreateForm/CreateForm'
import Footer from '/src/components/Footer/Footer'
import Header from '/src/components/Header/Header'
import { useTranslation } from '/src/i18n/server'

const Page = async () => {
  const { t, i18n } = await useTranslation('home')

  return <>
    <Content>
      <Header isFull />
    </Content>

    <Content>
      <CreateForm />
    </Content>

    <Footer />
  </>
}

export default Page
