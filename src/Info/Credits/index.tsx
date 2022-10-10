import { Header, Page, Main, Section } from '@flumens';
import logo from 'common/images/flumens.svg';
import './styles.scss';

const { P, H } = Section;

export default () => (
  <Page id="credits">
    <Header title="Credits" />
    <Main>
      <Section>
        <P>
          We would like to thank Denys Ovenden for permission to use his
          excellent watercolour illustrations of grasshoppers and related
          insects, which he originally produced for the 1988 atlas "Grasshoppers
          and Allied Insects of Great Britain and Ireland" by Judith Marshall
          and Chris Haes.
        </P>

        <P>
          Particular thanks also go to Baudewijn Odé for the outstanding audio
          recordings of Orthoptera songs used in this app, and to David Ragge
          for the very helpful diagrams that illustrate them.
        </P>

        <P>
          We are very grateful to all of the photographers whose excellent
          images we have used in this app: Marc AuMarc, Ettore Balocchi, Tristan
          Bantock, Clifton Beard, Manfred Beutner, Ian Boyd, Bramblejungle, Paul
          Brock, Thomas Brown, David Browne, Alain C, Graham Canny, Patrick
          Clement, Matt Cole, Charles David, Didier, Jean-Daniel Echenard,
          Steven Falk, Michael Foley, François & Marie, Guy Freeman, Gbohne,
          David Genoud, Eric Gofreed, Gabriel González, Ferran Turmo Gort, Sarah
          Gould, Oskar Gran, Irene Grassi, Brian Gratwicke, Armin H, Debbie
          Hall, Leslie Hebdon, Michael Hrabar, Valter Jacinto, Rudo Jureček,
          Katya, Bas Kers, Michel Lecoq, Billy Lindblom, J.K. Lindsey, Laurence
          Livermore, Keith Lugg, Marvin Magdadaro, Mamjodh, Jürgen Mangelsdorf,
          Martin Matthews, Sean McCann, Thomas Meehan, Rob Mills, Chris Moody,
          Naturalhistoryman, naturgucker.de, nutmeg66, Erling Ólafsson,
          Oldbilluk, Wolfgang Omert, Gary Palmer, LiChieh Pan, Ferran Pestaña,
          Stephen Plant, Colleen Potter, Roger Powley, Vlad Proklov, Joan
          Quintana, Christophe Quintin, Joaquín Ramírez, Tim Ransom, Augusto
          Ravagli, Stuart Read, Gilles san Martin, Anders Sandberg, Sankax,
          Lynette Schimming, John Shortland, Shutterstock, Michael Skelton,
          Sodininkas, Peter Sutton, Manuel Valdueza, Emilian Robert Vicol, B.B.
          Wijdieks, David Williams, Michał Włodarczyk, Katy Wrathall, Sergey
          Yeliseev and Andrea Zampatti.
        </P>

        <P>
          We thank the following for providing input into the development of
          this app:
          <br />
          Björn Beckmann (
          <a href="http://www.brc.ac.uk">Biological Records Centre</a>);
          <br />
          Helen Roy, Jim Bacon, Colin Harrower, Nicholas Corker & Paul Fisher (
          <a href="http://ceh.ac.uk">UK Centre for Ecology & Hydrology</a>);
          <br />
          John van Breda (
          <a href="http://www.biodiverseit.co.uk">BiodiverseIT</a>).
        </P>
      </Section>

      <Section>
        <p className="logo">
          <a href="https://flumens.io">
            <img src={logo} alt="" />
          </a>
        </p>
        <P>
          This app was hand crafted with love by{' '}
          <a href="https://flumens.io" style={{ whiteSpace: 'nowrap' }}>
            Flumens.
          </a>{' '}
          A technical consultancy that excels at building bespoke environmental
          science and community focussed solutions. For suggestions and feedback
          please do not hesitate to{' '}
          <a href="mailto:enquiries%40flumens.io?subject=App%20Feedback">
            contact us
          </a>
          .
        </P>
      </Section>

      <Section>
        <H>Graphics</H>
        <P>
          Icons made by{' '}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </P>
      </Section>
    </Main>
  </Page>
);
