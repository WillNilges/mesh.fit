import { headers } from 'next/headers'

import Button from '/src/components/Button/Button'
import { useTranslation } from '/src/i18n/server'
import { makeClass } from '/src/utils'

import styles from './Footer.module.scss'
import { P } from '../Paragraph/Text'

interface FooterProps {
  isSmall?: boolean
}

const Footer = async ({ isSmall }: FooterProps) => {
  const { t } = await useTranslation('common')
  return <>
    <br></br>
  </>
}

export default Footer
