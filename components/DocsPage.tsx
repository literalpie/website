import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Flex, Badge, IconButton } from '@modulz/design-system';
import { HamburgerMenuIcon } from '@modulz/radix-icons';
import { ScrollArea } from '../components/ScrollArea';
import { RadixLogo } from './RadixLogo';
import { PrimitivesNav } from './PrimitivesNav';
import { DesignSystemNav } from './DesignSystemNav';
import { useProductType } from '../utils/useProductType';

export function DocsPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const productType = useProductType();

  React.useEffect(() => {
    const handleRouteChange = () => setIsOpen(false);
    router.events.on('routeChangeStart', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, []);

  return (
    <Flex
      css={{
        flexDirection: 'column',
        bp2: {
          flexDirection: 'row',
        },
      }}
    >
      <Box
        css={{
          width: '100%',
          maxHeight: 'auto',
          borderBottom: '1px solid',
          borderColor: '$gray500',
          WebkitOverflowScrolling: 'touch',
          overflowX: 'hidden',

          bp2: {
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            width: '250px',
            borderRight: '1px solid',
            borderBottom: '0',
          },
        }}
      >
        <ScrollArea>
          <Flex css={{ alignItems: 'center', p: '$4' }}>
            <NextLink href="/" passHref>
              <Box
                as="a"
                css={{
                  color: '$hiContrast',
                  display: 'inline-flex',
                  ':focus': { boxShadow: 'none' },
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    padding: 0,
                    margin: -1,
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    border: 0,
                  }}
                >
                  Stitches homepage
                </span>
                <RadixLogo />
              </Box>
            </NextLink>
            <Badge size="2" variant="yellow" css={{ ml: '$3' }}>
              Alpha
            </Badge>
            <Box css={{ ml: 'auto', mr: '$6', bp2: { display: 'none' } }}>
              <IconButton
                variant="ghost"
                onClick={() => setIsOpen(!isOpen)}
                state={isOpen ? 'active' : undefined}
              >
                <HamburgerMenuIcon />
              </IconButton>
            </Box>
          </Flex>

          <Box
            css={{
              display: isOpen ? 'block' : 'none',
              bp2: {
                display: 'block',
              },
            }}
          >
            {productType === 'primitives' && <PrimitivesNav />}
            {productType === 'designSystem' && <DesignSystemNav />}

            <Box css={{ height: '$5', bp2: { height: '$8' } }} />
          </Box>
        </ScrollArea>
      </Box>

      <Box
        css={{
          bp2: {
            width: '100%',
            pl: '250px',
            pr: 0,
          },
          bp3: {
            px: '250px',
            py: '$9'
          },
        }}
      >
        {children}
      </Box>
    </Flex>
  );
}