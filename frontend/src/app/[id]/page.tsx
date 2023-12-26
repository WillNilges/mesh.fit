import { Suspense } from 'react'
import { Trans } from 'react-i18next/TransWithoutContext'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Temporal } from '@js-temporal/polyfill'

import Content from '/src/components/Content/Content'
import Copyable from '/src/components/Copyable/Copyable'
import { getEvent, getPerson } from '/src/config/api'
import { useTranslation } from '/src/i18n/server'
import { makeClass, relativeTimeFormat } from '/src/utils'

import EventAvailabilities from './EventAvailabilities'
import styles from './page.module.scss'

interface PageProps {
  params: { id: string }
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const event = await getEvent(params.id).catch(() => undefined)
  const { t } = await useTranslation('event')

  return {
    title: event?.name ?? t('error.title'),
  }
}

// Example: http://localhost:1234/testing-292407?uname=Jennifer
const Page = async ({ params, searchParams }: { 
  params: PageProps, 
  searchParams: { [key: string]: string | string[] | undefined },
}) => {
  const event = await getEvent(params.id).catch(() => undefined)
  const resUser = await getPerson(params.id, searchParams.uname, undefined)
  //console.log(resUser) // DEBUG
  if (!event) notFound()

  const { t, i18n } = await useTranslation(['common', 'event'])

  return <>
    <Suspense
      fallback={<Content>
        <h1 className={styles.name}><span className={styles.bone} /></h1>
        <div className={styles.date}><span className={styles.bone} /></div>
        <div className={styles.info}><span className={styles.bone} style={{ width: '20em' }} /></div>
        <div className={styles.info}><span className={styles.bone} style={{ width: '20em' }} /></div>
      </Content>}
    >
      <Content>
        <h1 className={styles.name}>{event.name}</h1>
        <span
          className={styles.date}
          title={Temporal.Instant.fromEpochSeconds(event.created_at).toLocaleString(i18n.language, { dateStyle: 'long' })}
        >{t('common:created', { date: relativeTimeFormat(Temporal.Instant.fromEpochSeconds(event.created_at), i18n.language) })}</span>

      </Content>
    </Suspense>

    <EventAvailabilities event={event} urlUser={resUser} />
  </>
}

export default Page
