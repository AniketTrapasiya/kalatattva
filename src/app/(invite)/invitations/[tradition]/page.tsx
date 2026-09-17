import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import InvitationView from "@/invite/InvitationView";
import {
  findTradition,
  siteDescription,
  siteTitle,
  traditions,
} from "@/invite/data/weddingData";

/** One static route per tradition — shareable, indexable, server-rendered. */
export function generateStaticParams() {
  return traditions.map((t) => ({ tradition: t.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tradition: string }>;
}): Promise<Metadata> {
  const { tradition: id } = await params;
  const tradition = findTradition(id);
  if (!tradition) return {};

  const title = siteTitle(tradition.wedding);
  return {
    title,
    description: siteDescription(tradition.wedding),
    alternates: { canonical: `/invitations/${tradition.id}` },
    openGraph: {
      title,
      description: siteDescription(tradition.wedding),
      images: [{ url: tradition.heroArt.src }],
    },
  };
}

/** Next 16: themeColor belongs in viewport, not metadata. */
export async function generateViewport({
  params,
}: {
  params: Promise<{ tradition: string }>;
}): Promise<Viewport> {
  const { tradition: id } = await params;
  return { themeColor: findTradition(id)?.theme.primary };
}

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ tradition: string }>;
}) {
  const { tradition: id } = await params;
  const tradition = findTradition(id);
  if (!tradition) notFound();

  return <InvitationView tradition={tradition} />;
}
