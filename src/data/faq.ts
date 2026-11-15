// Plain-text answers. Also used for the FAQPage structured data.
export const faq: { q: string; a: string[] }[] = [
  {
    q: 'Is Know It free?',
    a: ['Yes. The extension is free, with no account and no subscription. Answers come from Google Gemini through your own key, and Google’s free tier covers about 8 hours of video a day.'],
  },
  {
    q: 'Why do I need a Gemini key?',
    a: ['So nothing goes through a server of ours. Your browser asks Google directly, with your key. Getting one takes about a minute at Google AI Studio, and it’s free.'],
  },
  {
    q: 'Does it work in the EU, the UK or Switzerland?',
    a: ['Yes, with a paid key. Google doesn’t give free keys there, so turn on billing for your key in Google AI Studio. Know It uses Google’s cheapest fast model.'],
  },
  {
    q: 'What is sent, and to whom?',
    a: ['Only the video you press Know it on: its link, title, channel, length, description and tags, sent to Google Gemini with your key. Gemini watches the video from its link. Your key and answers stay in your browser. There are no analytics and no servers of ours.'],
  },
  {
    q: 'Does it work on Shorts and the watch page?',
    a: ['Yes. Know it sits on thumbnails, beside Like on the video you’re watching, and inside the Shorts player.'],
  },
  {
    q: 'Which videos work?',
    a: ['Any public video, long ones included. Gemini watches the video itself, so answers come from what’s shown and said, not just the title. Private and unlisted videos and live streams can’t be answered.'],
  },
  {
    q: 'Can I get answers in my language?',
    a: ['Yes. Pick a language in Settings, or let answers follow the language of the video.'],
  },
  {
    q: 'Does it work on my phone, Firefox or Safari?',
    a: ['Not yet. Know It is an extension for Chrome on a computer. Open this page there to install it.'],
  },
];
