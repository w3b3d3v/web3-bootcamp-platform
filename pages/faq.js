import SEOHead from '../components/SEO'
import { buildFAQSchema, buildBreadcrumbSchema } from '../components/SEO/schemas'
import { faqData } from '../data/faq'
import Link from 'next/link'

const SITE_URL = 'https://build.w3d.community'

export default function FAQPage() {
  const faqSchema = buildFAQSchema(faqData)
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'FAQ', url: `${SITE_URL}/faq` },
  ])

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions (FAQ)"
        description="Find answers to common questions about WEB3DEV bootcamp. Learn about courses, NFT certificates, enrollment, Discord support, and getting started with Web3."
        canonical="/faq"
        keywords={[
          'web3dev faq',
          'bootcamp questions',
          'web3 bootcamp help',
          'NFT certificate questions',
          'how to start web3',
          'blockchain course faq',
          'web3dev perguntas frequentes',
        ]}
        jsonLd={[faqSchema, breadcrumbSchema]}
      />

      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="mb-10 text-base text-gray-600 dark:text-gray-400">
          Find answers to common questions about WEB3DEV bootcamp. Can&apos;t find what
          you&apos;re looking for?{' '}
          <a
            href="https://discord.w3d.community"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-500 underline hover:text-purple-400"
          >
            Join our Discord community
          </a>
          .
        </p>

        {faqData.map((section, idx) => (
          <section key={idx} className="mb-10">
            <h2 className="mb-5 border-b border-gray-200 pb-2 text-2xl font-semibold dark:border-gray-700">
              {section.category}
            </h2>
            {section.questions.map((faq, qIdx) => (
              <div
                key={qIdx}
                className="mb-6"
                itemScope
                itemType="https://schema.org/Question"
              >
                <h3
                  className="mb-2 text-lg font-semibold"
                  itemProp="name"
                >
                  {faq.question}
                </h3>
                <div
                  itemProp="acceptedAnswer"
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <p
                    className="text-sm leading-relaxed text-gray-700 dark:text-gray-300"
                    itemProp="text"
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </section>
        ))}

        <div className="mt-12 rounded-lg bg-gradient-to-r from-purple-900 to-blue-900 p-6 text-center">
          <h2 className="mb-2 text-xl font-bold text-white">Still have questions?</h2>
          <p className="mb-4 text-sm text-gray-300">
            Join thousands of Web3 developers in our community
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://discord.w3d.community"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-purple-600 px-6 py-2 font-bold text-white hover:bg-purple-500"
            >
              Join Discord
            </a>
            <Link href="/courses">
              <a className="rounded-lg bg-white px-6 py-2 font-bold text-gray-900 hover:bg-gray-100">
                Browse Courses
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
