import { Page, Main, Header, Section } from '@flumens';

const { P } = Section;

const About = () => (
  <Page id="about">
    <Header title="About" />
    <Main>
      <Section>
        <P>
          The iRecord Grasshoppers app helps you to identify the grasshoppers
          and related insects that you hear and see, and lets you log your
          sightings to support their study and conservation.
        </P>
        <P>
          The chirping of grasshoppers and crickets is one of the quintessential
          sounds of summer. As large and abundant insects they play essential
          ecological roles in grasslands and other habitats including as a food
          source for rare or declining birds like grey partridges, skylarks,
          cirl buntings, corncrakes, and common cranes, for small mammals such
          as harvest mice, and for spiders especially wolf spiders and large
          web-spinning spiders. The crickets and bush-crickets also help to
          control pests, for example by eating aphids.
        </P>
        <P>
          Over recent decades some grasshoppers and relatives have declined,
          while others have expanded their distributions and, even, some new
          species have arrived. The{' '}
          <a href="https://brc.ac.uk/">Biological Records Centre (BRC)</a>{' '}
          within the Centre for Ecology and Hydrology supports the study of many
          different species by working with 'recording schemes'. The
          Grasshoppers and Related Insects Recording Scheme of Britain and
          Ireland is one such scheme. Launched in 1967, it collates and analyses
          records of grasshoppers and related species, and maps their
          distributions. The information gathered is used by scientists to see
          how wildlife is responding to factors such as changes in land use and
          climate. This work would not be possible without the help of people,
          like you, reporting when and where they find a species.
        </P>
        <P>
          Any records you submit using the <strong>iRecord Grasshoppers</strong>{' '}
          app will be displayed to users of the{' '}
          <a href="https://irecord.org.uk/">iRecord website</a> and be examined
          and verified by an expert. Records will be collated and disseminated
          for conservation, environmental decision-making, education, scientific
          research and other public benefit uses.
        </P>
        <P>
          Many thanks for taking part! For results from the project and further
          information please visit{' '}
          <a href="https://irecord.org.uk/grasshopper-app-summary">
            grasshopper-app-summary
          </a>{' '}
          and <a href="http://www.orthoptera.org.uk">Orthoptera</a>.
        </P>
      </Section>
    </Main>
  </Page>
);

export default About;
