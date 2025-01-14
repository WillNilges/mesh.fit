'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Trans } from 'react-i18next/TransWithoutContext'

import AvailabilityEditor from '/src/components/AvailabilityEditor/AvailabilityEditor'
import AvailabilityViewer from '/src/components/AvailabilityViewer/AvailabilityViewer'
import Content from '/src/components/Content/Content'
import Login from '/src/components/Login/Login'
import Section from '/src/components/Section/Section'
import SelectField from '/src/components/SelectField/SelectField'
import { EventResponse, getPeople, PersonResponse, postToSlack, updatePerson } from '/src/config/api'
import { useTranslation } from '/src/i18n/client'
import timezones from '/src/res/timezones.json'
import { useStore } from '/src/stores'
import useRecentsStore from '/src/stores/recentsStore'
import useSettingsStore from '/src/stores/settingsStore'
import { calculateTable, expandTimes, makeClass } from '/src/utils'

import styles from './page.module.scss'
import Button from '/src/components/Button/Button'

interface EventAvailabilitiesProps {
  event?: EventResponse
}

const EventAvailabilities = ({ event, urlUser }: EventAvailabilitiesProps) => {
  const { t, i18n } = useTranslation('event')

  const timeFormat = useStore(useSettingsStore, state => state.timeFormat) ?? '12h'

  const [people, setPeople] = useState<PersonResponse[]>([])
  const expandedTimes = useMemo(() => expandTimes(event?.times ?? []), [event?.times])

  const [user, setUser] = urlUser === undefined || urlUser.name === 'undefined' ? useState<PersonResponse>() : useState<PersonResponse>(urlUser)
  const [password, setPassword] = useState<string>() // FIXME: Do we want to... remove this?

  const [tab, setTab] = useState<'group' | 'you'>('group')
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)

  // Web worker for calculating the heatmap table
  const tableWorker = useRef<Worker>()

  // Calculate table (using a web worker if available)
  const [table, setTable] = useState<ReturnType<typeof calculateTable>>()

  useEffect(() => {
    if (event && expandTimes.length > 0) {
      if (!tableWorker.current) {
        tableWorker.current = window.Worker ? new Worker(new URL('/src/workers/calculateTable', import.meta.url)) : undefined
      }
      const args = { times: expandedTimes, locale: i18n.language, timeFormat, timezone }
      if (tableWorker.current) {
        tableWorker.current.onmessage = (e: MessageEvent<ReturnType<typeof calculateTable>>) => setTable(e.data)
        tableWorker.current.postMessage(args)
        setTable(undefined)
      } else {
        setTable(calculateTable(args))
      }
    }
  }, [expandedTimes, i18n.language, timeFormat, timezone])

  // Add this event to recents
  const addRecent = useRecentsStore(state => state.addRecent)
  useEffect(() => {
    if (event) {
      addRecent({
        id: event.id,
        name: event.name,
        created_at: event.created_at,
      })
    }
  }, [addRecent])

  // Refetch availabilities
  useEffect(() => {
    if (tab === 'group' && event) {
      getPeople(event.id)
        .then(setPeople)
        .catch(console.warn)
    }
  }, [tab])

  return <>
    <Section id="login">
      <Content>
        <Login eventId={event?.id} user={user} onChange={(u, p) => {
          setUser(u)
          setPassword(p)
          setTab(u ? 'you' : 'group')
        }} />

        <SelectField
          label={t('form.timezone')}
          name="timezone"
          id="timezone"
          isInline
          value={timezone}
          onChange={event => setTimezone(event.currentTarget.value)}
          options={timezones}
        />

        {event?.timezone && event.timezone !== timezone && <p>
          <Trans i18nKey="form.created_in_timezone" t={t} i18n={i18n}>
            {/* eslint-disable-next-line */}
            {/* @ts-ignore */}
            _<strong>{{timezone: event.timezone}}</strong>
            _<a href="#" onClick={e => {
              e.preventDefault()
              setTimezone(event.timezone)
            }}>_</a>_
          </Trans>
        </p>}

        {((
          Intl.DateTimeFormat().resolvedOptions().timeZone !== timezone
          && (event?.timezone && event.timezone !== Intl.DateTimeFormat().resolvedOptions().timeZone)
        ) || (
          event?.timezone === undefined
          && Intl.DateTimeFormat().resolvedOptions().timeZone !== timezone
        )) && (
          <p>
            <Trans i18nKey="form.local_timezone" t={t} i18n={i18n}>
              {/* eslint-disable-next-line */}
              {/* @ts-ignore */}
              _<strong>{{timezone: Intl.DateTimeFormat().resolvedOptions().timeZone}}</strong>
              _<a href="#" onClick={e => {
                e.preventDefault()
                setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
              }}>_</a>_
            </Trans>
          </p>
        )}
      </Content>
    </Section>

    {user && <AvailabilityEditor
      eventId={event?.id}
      times={expandedTimes}
      timezone={timezone}
      value={user.availability}
      onChange={availability => {
        if (!event) return
        const oldAvailability = [...user.availability]
        setUser({ ...user, availability })
        addRecent({
          id: event.id,
          name: event.name,
          created_at: event.created_at,
          user: availability.length > 0 ? {
            name: user.name,
            availability,
          } : undefined,
        })
        updatePerson(event.id, user.name, { availability }, password)
          .catch(e => {
            console.warn(e)
            setUser({ ...user, availability: oldAvailability })
          })
      }}
      table={table}
    />}

    {
      user && <div className={styles.buttonWrapper}>
        <Button
          onClick={(e:any) => {
            if (event) {
              try {
                console.log("Sending to Slack...")
                postToSlack(event?.id)
                alert("Availability Submitted! Somebody will be in touch shortly :)")
                window.location.replace("http://nycmesh.net")
              } catch (e) {
                  console.error(e)
              }
            }
          }}
          isLoading={event?.id === undefined}
          disabled={event?.id === undefined}
        >{t('form.slack')}</Button>
      </div>
    }
  </>
}

export default EventAvailabilities
