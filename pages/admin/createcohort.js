import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { createCohortInFirestore } from '../../lib/cohorts'
import Layout from '../../components/layout'
import Head from 'next/head'

export default function CreateCohort() {
  const [state, setState] = useState({
    name: '',
    nft_title: '',
    discord_role: '',
    discord_channel: '',
    course_id: '',
    email_content: {},
    endDate: null,
    startDate: null,
    kickoffStartTime: null,
    kickoffEndTime: null,
  })
  const completedForm = (obj) => {
    return Object.values(obj).every((prop) => prop !== null)
  }
  const saveCohort = async () => {
    if (!completedForm(state)) return toast.error('Você não preencheu todos os parâmetros')
    await createCohortInFirestore(state)
    return toast.success('Cohort criado com sucesso!')
  }
  return (
    <Layout>
      <Head>
        <title>Create Cohort - Bootcamp Web3Dev</title>
      </Head>
      <main className="container mx-auto mt-16 px-6 py-2 sm:px-6 md:px-6 lg:px-32 xl:py-0">
        <div className="mb-3 mt-6  bg-white-100 p-3 dark:bg-black-200">
          <div className="rounded-lg bg-white-100 shadow-xl dark:bg-black-200">
            <div className="flex">
              <div className="px-6 py-5">
                <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
                  👩‍🎤 Informações Gerais
                </p>
                <div className="mt-7 flex flex-col justify-around lg:flex-row">
                  <div className="xl:basis-1/1 mb-6 flex w-full flex-row flex-wrap gap-y-3 sm:gap-x-6 lg:mb-0 xl:gap-x-40">
                    <div className="grow sm:basis-5/12">
                      <Input
                        label="Cohort Name"
                        id="cohort-name"
                        placeholder="PIONEIROS"
                        onChange={(e) => setState({ ...state, name: e.target.value })}
                      />
                    </div>
                    <div className="grow sm:basis-5/12">
                      <Input
                        label="NFT Title"
                        id="nft-title"
                        placeholder="nft_title"
                        onChange={(e) => setState({ ...state, nft_title: e.target.value })}
                      />
                    </div>
                    <div className="grow sm:basis-5/12">
                      <Input
                        label="Discord Role"
                        id="discord-role"
                        placeholder="56164984896132"
                        onChange={(e) => setState({ ...state, discord_role: e.target.value })}
                      />
                    </div>
                    <div className="grow sm:basis-5/12 ">
                      <Input
                        label="Cohort Start Date"
                        id="cohort-start-date"
                        type="datetime-local"
                        onChange={(e) =>
                          setState({ ...state, startDate: new Date(e.target.value) })
                        }
                      />
                    </div>
                    <div className="grow sm:basis-5/12">
                      <Input
                        label="Discord Channel"
                        id="discord-channel"
                        placeholder="cohort-name-pioneiros"
                        onChange={(e) => setState({ ...state, discord_channel: e.target.value })}
                      />
                    </div>
                    <div className="grow sm:basis-5/12 ">
                      <Input
                        label="Cohort End Date"
                        id="cohort-end-date"
                        type="datetime-local"
                        onChange={(e) => setState({ ...state, endDate: new Date(e.target.value) })}
                      />
                    </div>
                    <div className="grow sm:basis-5/12 ">
                      <Input
                        label="Course ID"
                        id="course-id"
                        placeholder="NFT Collection"
                        onChange={(e) => setState({ ...state, course_id: e.target.value })}
                      />
                    </div>

                    <div className="grow sm:basis-5/12 ">
                      <Input
                        label="Kickoff Start Time"
                        id="kickoff-start-time"
                        type="datetime-local"
                        onChange={(e) =>
                          setState({ ...state, kickoffStartTime: new Date(e.target.value) })
                        }
                      />
                    </div>
                    <div className="grow sm:basis-5/12 ">
                      <Input
                        label="Email Subject"
                        id="email-subject"
                        placeholder="Como escrever seu primeiro smart..."
                        onChange={(e) =>
                          setState({ ...state, email_content: { subject: e.target.value } })
                        }
                      />
                    </div>
                    <div className="grow sm:basis-5/12 ">
                      <Input
                        label="Kickoff End Time"
                        id="kickoff-end-time"
                        type="datetime-local"
                        onChange={(e) =>
                          setState({ ...state, kickoffEndTime: new Date(e.target.value) })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="lg:py-4">
                  <Button id="create-cohort" onClick={() => saveCohort()}>
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
