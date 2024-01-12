import localFont from 'next/font/local'
import Link from 'next/link'

import { useTranslation } from '/src/i18n/server'
import logo from '/src/res/logo.svg'
import { makeClass } from '/src/utils'

import styles from './Header.module.scss'

const roboto = localFont({
  src: './roboto.woff2',
  fallback: ['monospace'],
})

interface HeaderProps {
  /** Show the full header */
  isFull?: boolean
  isSmall?: boolean
}

const Header = async ({ isFull, isSmall }: HeaderProps) => {
  const { t } = await useTranslation(['common', 'home'])

  return <header className={styles.header} data-small={isSmall}>
    {isFull ? <>
      {!isSmall && <img className={styles.bigLogo} src={logo.src} height={512} width={512} alt="" />}
      <span className={makeClass(styles.subtitle, roboto.className, !/^[A-Za-z ]+$/.test(t('home:create')) && styles.hasAltChars)}>{t('home:create')}</span>
    </> : 
      <div className={styles.top}>
        <img className={styles.logo} src={logo.src} height={512} width={512} alt="" />
        <span className={makeClass(styles.subtitle, roboto.className)}>Schedule Service</span>
      </div>}
  </header>
}

export default Header
