import localFont from 'next/font/local'
import Link from 'next/link'

import { useTranslation } from '/src/i18n/server'
import logo from '/src/res/logo.svg'
import { makeClass } from '/src/utils'

import styles from './Header.module.scss'

const samuraiBob = localFont({
  src: './samuraibob.woff2',
  fallback: ['sans-serif'],
})
const molot = localFont({
  src: './molot.woff2',
  fallback: ['sans-serif'],
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
      <span className={makeClass(styles.subtitle, 'sans-serif', !/^[A-Za-z ]+$/.test(t('home:create')) && styles.hasAltChars)}>{t('home:create')}</span>
    </> : <Link href="/" className={styles.link}>
      <div className={styles.top}>
        <img className={styles.logo} src={logo.src} height={512} width={512} alt="" />
        <span className={makeClass(styles.title, molot.className)}>MESH FIT</span>
      </div>
    </Link>}
  </header>
}

export default Header
