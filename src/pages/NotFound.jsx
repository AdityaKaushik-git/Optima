import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import PageHeader from '../components/PageHeader';

export default function NotFound() {
  return (
    <>
      <PageHeader title="Page not found" crumb="404" lede="This page doesn't exist. It may have moved when the site was rebuilt." />
      <section className="section wrap">
        <Link to="/" className="btn btn--dark"><Home size={18} /> Go to the home page</Link>
      </section>
    </>
  );
}
