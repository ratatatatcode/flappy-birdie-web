import Image from 'next/image';

export default function Bird() {
  return (
    <Image
      src="/assets/birdie.gif"
      height={36}
      width={48}
      alt="Bird"
      className="absolute top-[50%] left-[20%] z-40"
    ></Image>
  );
}
