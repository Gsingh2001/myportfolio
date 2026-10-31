import { permanentRedirect } from 'next/navigation';

/** Old price-list URL. Public site no longer publishes prices. */
export default function PricingPage() {
  permanentRedirect('/contact');
}
