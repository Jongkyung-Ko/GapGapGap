import { Redirect } from 'expo-router';

/** @deprecated use /analysis */
export default function MetroRedirect() {
  return <Redirect href="/analysis" />;
}
