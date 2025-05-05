import { getClient } from "@/fake-backend/fake-data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import ContactInfo from "./ContactInfo";
import ContactInfoSkeleton from "./ContactSkeleton";
import NoContactSelected from "./NoContactSelected.tsx";

const ContactDetails = () => {
  const { clientId } = useParams();
  const { data: Client, isLoading } = useQuery({
    queryKey: [`clientId-${clientId}`],
    queryFn: () => getClient(clientId!),
    enabled: !!clientId
  });

  if (!clientId) return <NoContactSelected />;
  if (isLoading && !Client) return <ContactInfoSkeleton />;
  if (Client) return <ContactInfo Client={Client} />;
};

export default ContactDetails;
