import { Link } from "react-router";
import { sleep } from "~/lib/utils";
import type { Route } from "./+types/testingArgPage";

// export function meta() {
//   return [
//     { title: "Support Chat" },
//     {
//       property: "og:title",
//       content: "Support Chat"
//     },
//     {
//       name: "description",
//       content: "Support Chat for the app"
//     }
//   ];
// }

// export function headers() {
//   return {
//     "X-Stretchy-Pants": "its for fun",
//     "Cache-Control": "max-age=300, s-maxage=3600"
//   };
// }

export function links() {
  return [
    // {
    //   rel: 'icon',
    //   href: '/favicon.png',
    //   type: 'image/png',
    // },
    // {
    //   rel: 'stylesheet',
    //   href: 'https://example.com/some/styles.css',
    // },
    // {
    //   rel: 'preload',
    //   href: '/images/banner.jpg',
    //   as: 'image',
    // },
  ];
}
export async function loader({ params }: Route.LoaderArgs) {
  // console.log({ params });
  await sleep(200);
  return { hola: "mundo" };
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  // const { id, name, age } = params;

  await sleep(500);

  return { hola: "mundo" };
}

export function HydrateFallback() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-t-4 border-blue-500"></div>
        <p className="text-xl text-gray-600">Cargando...</p>
      </div>
    </div>
  );
}

// clientLoader.hydrate = true as const;
export default function MyComponent({
  loaderData,
  actionData,
  params,
  matches
}: Route.ComponentProps) {
  type plainObject = Record<string, any>;

  let fn = (objeto: plainObject): string[] =>
    Object.entries(objeto).map(([key, value]) => {
      if (value === null) {
        return ` ${key}: null,`;
      }
      if (typeof value === "undefined") {
        return ` ${key}: undefined,`;
      }

      if (
        typeof value == "object" &&
        value !== null &&
        typeof value !== "undefined"
      ) {
        let nested = fn(value).join("");
        return `${key}: { ${nested}}, `;
      }

      return ` ${key}: ${value}, `;
    });
  let matchedStringified = fn(matches);
  return (
    <div>
      <h1 className="text-2xl font-black mt-4">testing Args Page</h1>
      <p>Loader Data: {fn(loaderData)}</p>
      <p>Action Data: {JSON.stringify(actionData)}</p>
      <p>Route Parameters: {fn(params)}</p>
      <ul>
        <h2 className="mb-1">Matched Routes:</h2>

        {matchedStringified.map((item, idx) => {
          return (
            <li className="mb-4" key={idx}>
              <span className={`mb-0.5 pl-4`}>{item} </span>
            </li>
          );
        })}
      </ul>

      <Link to="/auth/testing" className="text-blue-500 underline text-2xl">
        Testing
      </Link>
    </div>
  );
}
