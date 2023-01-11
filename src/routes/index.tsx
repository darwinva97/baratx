import { component$, Resource } from '@builder.io/qwik';
import type { DocumentHead, RequestHandler } from '@builder.io/qwik-city';
import { useEndpoint } from '@builder.io/qwik-city'
import { Link } from '@builder.io/qwik-city';
import { builder } from '@builder.io/sdk'

interface IProduct {
  name: string
}

export const onGet: RequestHandler<IProduct[]> = async () => {

  builder.init(import.meta.env.VITE_BUILDER_KEY)

  const products = (await builder.getAll('product')).map(p => p.data) as IProduct[]

  return products
};

export default component$(() => {
  const products = useEndpoint<IProduct[]>();

  return (
    <div>
      <Resource
        value={products}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Error</div>}
        onResolved={(products) => (
          <>
          <div>
            {JSON.stringify(products)}
          </div>
          </>
        )}
      />

      <Link class="mindblow" href="/flower/">
        Blow my mind 🤯
      </Link>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};