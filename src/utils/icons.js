const icons = {
  'add-one': {
    p1: 'M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z',
    p2: 'M24 16V32',
    p3: 'M16 24L32 24',
  },
  'arrow-left': {
    p1: 'M5.79889 24H41.7989',
    p2: 'M17.7988 36L5.79883 24L17.7988 12',
  },
  'arrow-right': {
    p1: 'M41.9999 24H5.99994',
    p2: 'M30 12L42 24L30 36',
  },
  attention: {
    p1: 'M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z',
    p2: 'M24 37C25.3807 37 26.5 35.8807 26.5 34.5C26.5 33.1193 25.3807 32 24 32C22.6193 32 21.5 33.1193 21.5 34.5C21.5 35.8807 22.6193 37 24 37Z',
    p3: 'M24 12V28',
  },
  close: {
    p1: 'M8 8L40 40',
    p2: 'M8 40L40 8',
  },
  'close-one': {
    p1: 'M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z',
    p2: 'M29.6567 18.3432L18.343 29.6569',
    p3: 'M18.3433 18.3432L29.657 29.6569',
  },
  delete: {
    p1: 'M9 10V44H39V10H9Z',
    p2: 'M20 20V33',
    p3: 'M28 20V33',
    p4: 'M4 10H44',
    p5: 'M16 10L19.289 4H28.7771L32 10H16Z',
  },
  info: {
    p1: 'M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z',
    p2: 'M24 11C25.3807 11 26.5 12.1193 26.5 13.5C26.5 14.8807 25.3807 16 24 16C22.6193 16 21.5 14.8807 21.5 13.5C21.5 12.1193 22.6193 11 24 11Z',
    p3: 'M24.5 34V20H23.5H22.5',
    p4: 'M21 34H28',
  },
  'preview-close-one': {
    p1: 'M9.85786 18C6.23858 21 4 24 4 24C4 24 12.9543 36 24 36C25.3699 36 26.7076 35.8154 28 35.4921M20.0318 12.5C21.3144 12.1816 22.6414 12 24 12C35.0457 12 44 24 44 24C44 24 41.7614 27 38.1421 30',
    p2: 'M20.3142 20.6211C19.4981 21.5109 19 22.6972 19 23.9998C19 26.7612 21.2386 28.9998 24 28.9998C25.3627 28.9998 26.5981 28.4546 27.5 27.5705',
    p3: 'M42 42L6 6',
  },
  'preview-open': {
    p1: 'M24 36C35.0457 36 44 24 44 24C44 24 35.0457 12 24 12C12.9543 12 4 24 4 24C4 24 12.9543 36 24 36Z',
    p2: 'M24 29C26.7614 29 29 26.7614 29 24C29 21.2386 26.7614 19 24 19C21.2386 19 19 21.2386 19 24C19 26.7614 21.2386 29 24 29Z',
  },
  'reduce-one': {
    p1: 'M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z',
    p2: 'M16 24L32 24',
  },
  tips: {
    p1: 'M40 20C40 26.8077 35.7484 32.6224 29.7555 34.9336H24H18.2445C12.2516 32.6224 8 26.8077 8 20C8 11.1634 15.1634 4 24 4C32.8366 4 40 11.1634 40 20Z',
    p2: 'M29.7557 34.9336L29.0766 43.0831C29.0334 43.6014 28.6001 44 28.08 44H19.9203C19.4002 44 18.9669 43.6014 18.9238 43.0831L18.2446 34.9336',
    p3: 'M18 17V23L24 20L30 23V17',
  },
  write: {
    p1: 'M5.32497 43.4996L13.81 43.4998L44.9227 12.3871L36.4374 3.90186L5.32471 35.0146L5.32497 43.4996Z',
    p2: 'M27.9521 12.3872L36.4374 20.8725',
  },
};

export default icons;
