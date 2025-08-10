
import "./globals.css";
import {
  inter,
  dmSans,
  montserrat,
  manrope,
  playfairDisplay,
  plusJakartaSans,
  robotoMono
} from './fonts';

import { getEventDetails } from '../lib/data';
import { headers } from 'next/headers';


const IMG_BASE_URL = 'https://event-manager.syd1.cdn.digitaloceanspaces.com/';
export const dynamic = 'force-dynamic'

function stripHtml(html) {
  if (!html) return '';
  
  // First decode HTML entities
  const decodeEntities = (text) => {
    const entities = {
      '&nbsp;': ' ',
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&#x27;': "'",
      '&#x2F;': '/',
      '&#39;': "'",
      '&#47;': '/',
      '&#x2F;': '/',
      '&apos;': "'"
    };
    
    return text.replace(/&[^;]+;/g, entity => entities[entity] || entity);
  };

  // Remove HTML tags and decode entities
  const text = html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ')    // Replace multiple spaces with single space
    .trim();
    
  return decodeEntities(text);
}

export async function generateMetadata() {
 
  try {
    console.log("Generating metadata");
    // const hostDomain = headers().get('x-forwarded-host');
    const hostDomain = 'localhost';
    console.log(hostDomain, "hostDomain from instasnap layout");
    const eventData = await getEventDetails(hostDomain);
    console.log(eventData, "eventData from layout");
    // console.log(eventData, "eventData from layout");
    const event = eventData.domainData.event;
    console.log(event.title , "event title from layout");
    console.log(event.logo , "event logo from layout");
    
    return {
      metadataBase: new URL(`https://${eventData.domainData.domain}`),
      title: {
        default: event.title || 'Insta Snap',
        // default : 'Event Hex',
        template: '%s'
      },
      icons: {
        icon: [IMG_BASE_URL + event.logo,IMG_BASE_URL + event.banner],
      },
      description: stripHtml(event.description),
      openGraph: {
        title: event.title,
        images: [IMG_BASE_URL + event.logo,IMG_BASE_URL + event.banner],
      },
      twitter: {
        card: 'summary_large_image',
        title: event.title,
        images: [IMG_BASE_URL + event.logo,IMG_BASE_URL + event.banner],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      metadataBase: new URL('https://instarecap.eventhex.ai'),
      title: {
        default: 'Insta-Recap Powered by EventHex',
        template: '%s'
      },
      description: 'Your Insta Snap',
    };
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dmSans.variable} ${montserrat.variable} ${manrope.variable} ${playfairDisplay.variable} ${plusJakartaSans.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}