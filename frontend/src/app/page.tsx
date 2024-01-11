import { Metadata } from 'next'

import Redirect from './Redirect'
import { P } from '../components/Paragraph/Text'

export const metadata: Metadata = {
  title: 'Schedule Service',
}

const Page = async () => <>
  <P>
    Hello! It seems you've found our scheduling system. If you would like to
    schedule service, please ask in #support. Thanks, and have a nice day 🙂
  </P>
  <Redirect />
</>

export default Page



