import { Form, NavLink } from "react-router";
import { sleep } from "~/lib/utils";
import type { Route } from "./+types/testingPage";

export async function action({ request }: Route.ActionArgs) {
  await sleep(1000);

  const data = await request.formData();
  const name = data.get("name");
  const allData = Object.fromEntries(data);
  // data.get("title"),

  console.log("Server Side - Action");
  console.log({ name, allData });

  return { ok: true, message: "Todo bien desde el serverAction" };
}

export async function clientAction({
  serverAction,
  request
}: Route.ClientActionArgs) {
  await sleep(1000);

  const formData = await request.clone().formData();
  const allData = Object.fromEntries(formData);
  // data.get("title"),

  // can still call the server action if needed
  const data = await serverAction();
  // return data;
  return {
    message: "Hola Mundo desde el clientAction - Client",
    data,
    allData
  };
}

export async function loader() {
  return {
    message: "Hello, world! - SERVER LOADER",
    serverLoader: "serverLoader = true"
  };
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  // call the server loader
  const serverData = await serverLoader();
  // And/or fetch data on the client

  // Return the data to expose through useLoaderData()
  return { message: "hello world - client loader", serverData: serverData };
}

export default function testingPage({
  loaderData,
  actionData,
  params,
  matches
}: Route.ComponentProps) {
  // const data = useLoaderData();
  // console.log(matches);
  // const navigation = useNavigation();
  // const isPosting = navigation.state === 'submitting';
  return (
    <div>
      <h1 className="text-2xl font-black mt-4">testingPage</h1>
      <p>Loader Data: {JSON.stringify(loaderData)}</p>
      <p>Action Data: {JSON.stringify(actionData)}</p>
      <p>Route Parameters: {JSON.stringify(params)}</p>
      <p>Matched Routes: {JSON.stringify(matches)}</p>
      {/*
       */}

      <NavLink
        to="/auth/testing-arg/dd/fdds/45"
        className={({ isPending }) =>
          isPending
            ? "text-red-500 underline text-2xl"
            : "text-blue-500 underline text-2xl"
        }
      >
        Testing Args
      </NavLink>

      {/* action="/auth/testing" */}
      <Form className="mt-2 flex gap-2" method="post">
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          name="name"
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          name="age"
        />
        <button
          className="bg-blue-500 text-white rounded-md p-2 disabled:opacity-50"
          type="submit"
        >
          {/*  renderizar una funcion solo es valido como un hijo de un NavLink de react router */}
          {/* {({isSubmiting}) => {
            console.log(props);
            return 
            }} */}
          <span>Submit</span>;
        </button>
      </Form>
    </div>
  );
}
