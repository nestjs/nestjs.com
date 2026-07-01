export type OpenCollectiveSponsorsRto = Backer[];

export interface Backer {
  MemberId: number;
  createdAt: string;
  type: string;
  role: string;
  tier: string;
  isActive: boolean;
  totalAmountDonated: number;
  currency: string;
  lastTransactionAt: string;
  lastTransactionAmount: number;
  profile: string;
  name: string;
  company?: string;
  description?: string;
  image?: string;
  twitter?: string;
  github?: string;
  website?: string;
  email: any;
  newsletterOptIn: any;
}

export async function fetchBronzeSponsors(): Promise<Backer[]> {
  const fetchBronzeSponsorsUrl = `https://opencollective.com/nest/tiers/bronze-sponsors/all.json`;
  const sponsors = await fetchSponsors(fetchBronzeSponsorsUrl);
  return [
    {
      image: "/sponsors/bronze/netlify.svg",
      website: "https://netlify.com/",
      name: "Netlify",
    } as any,
  ].concat(sponsors);
}

export async function fetchSilverSponsors(): Promise<Backer[]> {
  const fetchSilverSponsorsUrl = `https://opencollective.com/nest/tiers/silver-sponsors/all.json`;
  const fetchAnnualSilverSponsorsUrl = `https://opencollective.com/nest/tiers/silver-sponsors-yearly/all.json`;
  const sponsors = await Promise.all([
    fetchSponsors(fetchSilverSponsorsUrl),
    fetchSponsors(fetchAnnualSilverSponsorsUrl),
  ]).then((results) => results.flat());
  return sponsors.filter((sponsor) => {
    // Filter out casinos, gambling, and adult content companies
    const blacklist = [
      "casino",
      "gambling",
      "bet",
      "win",
      "poker",
      "adult",
      "xxx",
    ];
    const name = sponsor.name.toLowerCase();
    return !blacklist.some((term) => name.includes(term));
  });
}

function fetchSponsors(url: string): Promise<Backer[]> {
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data) {
        return [];
      }

      const oneMonth = 1000 * 60 * 60 * 24 * 30;
      const now = new Date();
      const activeSponsors = data.filter(
        (sponsor: Backer) =>
          sponsor.isActive ||
          (sponsor.lastTransactionAt &&
            new Date(sponsor.lastTransactionAt).getTime() >
              now.getTime() - oneMonth),
      );

      return activeSponsors.filter((item: Backer) => item.image);
    });
}
