import PublicacionesList from '~/app/screens/(publicaciones)/PublicacionesList';
import { AppScreen } from '~/components/AppScreen';
import HeaderBar from '~/components/HeaderBar';

export default function Home() {
  return (
    <AppScreen title="Inicio">
      <HeaderBar />
      <PublicacionesList />
    </AppScreen>
  );
}
