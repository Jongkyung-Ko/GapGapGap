import { useRouter, type Href } from 'expo-router';
import { Platform, Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

type Props = Omit<PressableProps, 'onPress' | 'style'> & {
  href: Href | string;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

/**
 * Web-safe navigation link.
 * Expo Router `Link asChild` + style arrays crashes RN-web with
 * CSSStyleDeclaration indexed setter errors → blank white page.
 * On web we do a full document navigation so pre-rendered HTML loads cleanly.
 */
export function AppLink({ href, style, children, ...rest }: Props) {
  const router = useRouter();
  const path = typeof href === 'string' ? href : String(href);

  return (
    <Pressable
      {...rest}
      style={style}
      accessibilityRole="link"
      onPress={() => {
        if (Platform.OS === 'web' && typeof window !== 'undefined') {
          window.location.assign(path);
          return;
        }
        router.push(href as Href);
      }}
    >
      {children}
    </Pressable>
  );
}
