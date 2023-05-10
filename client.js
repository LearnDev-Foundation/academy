import sanityClient from "@sanity/client";

export default sanityClient({
    projectId: "gpr0m2q4",
    dataset: "production",
    useCdn: true,
});