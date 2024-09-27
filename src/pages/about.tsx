import type { ReactElement } from 'react'
import { Layout } from '../components/layout'
import { dict } from '../constant'
import { H2, P } from '../components/typography'

export default function About(): ReactElement {
  return (
    <Layout header={dict.headerAbout}>
      <section>
        <H2>What is Pulse Remote?</H2>
        <P>
          Pulse Remote is a simple app that allows Linux users to control their PC's volume remotely, compatible with
          both PulseAudio and PipeWire.
        </P>

        <H2>Our Story</H2>
        <P>
          Born from the desire to control media volume while relaxing in bed, Pulse Remote brings convenience to Linux
          users with PCs connected to TVs.
        </P>

        <H2>GitHub</H2>
        <P>
          Find us on GitHub: <a href='https://github.com/undg/pulse-remote'>github.com/undg/pulse-remote</a>
        </P>
      </section>
    </Layout>
  )
}
