// import { getClient } from "@/fake-backend/fake-data";
// import { useQuery } from "@tanstack/react-query";

import { useLoaderData, useNavigation, useParams } from "react-router";
import ContactInfo from "./ContactInfo";
import ContactInfoSkeleton from "./ContactSkeleton";
import NoContactSelected from "./NoContactSelected";

const ContactDetails = () => {
  const navigation = useNavigation();
  const { contactId } = useParams();

  const { client } = useLoaderData();

  if (contactId !== client.id && navigation.state === "loading")
    return <ContactInfoSkeleton />;
  if (client !== null) return <ContactInfo Client={client} />;
  if (!contactId && navigation.state === "idle") return <NoContactSelected />;
};

export default ContactDetails;
