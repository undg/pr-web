import Head from 'components/head'
import { TopNav } from 'components/top-nav'
import { ABOUT_HEAD_NAME as ABOUT_HEAD_TITLE } from 'constant'
import type { ReactElement } from 'react'

export default function About(): ReactElement {
  return (
    <div>
      <Head title={ABOUT_HEAD_TITLE} />
      <TopNav />

      <section>
        <h2>What is Pulse Remote?</h2>
        <p>
          Pulse Remote is a simple app that allows Linux users to control their PC's volume remotely, compatible with
          both PulseAudio and PipeWire.
        </p>
      </section>

      <section>
        <h2>Our Story</h2>
        <p>
          Born from the desire to control media volume while relaxing in bed, Pulse Remote brings convenience to Linux
          users with PCs connected to TVs.
        </p>
      </section>

      <section>
        <h2>GitHub</h2>
        <p>
          Find us on GitHub: <a href='https://github.com/undg/pulse-remote'>github.com/undg/pulse-remote</a>
        </p>
      </section>
    </div>
  )
}
