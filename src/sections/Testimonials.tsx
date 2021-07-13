import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import TestimonialCard from 'components/TestimonialCard';
import avatarDefaultImage from 'assets/images/avatar.png';

SwiperCore.use([Autoplay]);

type testimonialData = {
  image: string;
  text: string;
  username: string;
  name: string;
  id: string;
};

const TESTIMONIALS_DATA: testimonialData[][] = [
  [
    {
      image: avatarDefaultImage.src,
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta enim ut iste consectetur, nemo, hic ipsam, aut deserunt reiciendis commodi eveniet error quis omnis voluptatem dolorem eligendi aspernatur animi optio?',
      username: '@lorem ipsum',
      name: 'Lorem Ipsum',
      id: '13434123',
    },
    {
      image: avatarDefaultImage.src,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum autem aut commodi nulla ea eum necessitatibus eos laudantium similique officia.',
      username: '@lorem ipsum',
      name: 'Lorem Ipsum',
      id: '1234124213423',
    },
  ],
  [
    {
      image: avatarDefaultImage.src,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero porro harum, debitis quisquam eaque maxime! Aliquid, iste officiis! Ratione voluptates magni ipsum atque. Expedita neque accusantium doloribus molestias doloremque, dicta, illum ex eveniet saepe eos est quia laborum mollitia minima.',
      username: '@lorem ipsum',
      name: 'Lorem Ipsum',
      id: 'fadf412',
    },
    {
      image: avatarDefaultImage.src,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo excepturi possimus quisquam beatae odio, enim itaque labore in quas vero rerum quaerat aspernatur, dolorum ad corporis aliquam! Accusantium, ab facere?',
      username: '@lorem ipsum',
      name: 'Lorem Ipsum',
      id: '14390fasdr',
    },
  ],
  [
    {
      image: avatarDefaultImage.src,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo odio voluptatibus, quod in adipisci voluptas eveniet, ratione placeat dicta voluptatum facilis maiores deleniti nihil veritatis libero amet quae eligendi sit! Cumque officiis fugiat atque repudiandae? Temporibus nobis ex repellat omnis.',
      name: 'Lorem Ipsum',
      username: '@lorem ipsum',
      id: 'fasdf95432fdas',
    },
    {
      image: avatarDefaultImage.src,
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde hic dolor commodi? Pariatur dignissimos accusamus maiores dicta molestias amet tempore?',
      username: '@lorem ipsum',
      name: 'Lorem Ipsum',
      id: '324fvgadf89',
    },
  ],
  [
    {
      image: avatarDefaultImage.src,
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente dolorum cumque similique, eum assumenda magni eos rem molestiae. Iusto nostrum deleniti, tempora nihil blanditiis ex dolor, dolore illo ab accusamus soluta ea dolorem corporis modi earum atque quis, magnam voluptatem.',
      name: 'Lorem Ipsum',
      username: '@lorem ipsum',
      id: '43fd980vnsd',
    },
    {
      image: avatarDefaultImage.src,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae excepturi sequi qui. Quis, a! Reiciendis, iure aperiam. Molestias, magni blanditiis?',
      name: 'Lorem Ipsum',
      username: '@lorem ipsum',
      id: 'fdsa921412k',
    },
  ],
  [
    {
      image: avatarDefaultImage.src,
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe fuga numquam ullam nobis laboriosam, tempore, aspernatur tenetur quam optio possimus odit quibusdam incidunt dignissimos soluta dolorem, dolor pariatur porro! Quae.',
      username: '@lorem ipsum',
      name: 'Lorem Ipsum',
      id: '134123980vdsj',
    },
    {
      image: avatarDefaultImage.src,
      text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam sapiente, culpa doloremque rem cupiditate est debitis deleniti commodi excepturi iste odio qui rerum labore! Accusamus fugit quis laborum et alias saepe dolorem assumenda nostrum aut.',
      username: '@lorem ipsum',
      name: 'Lorem Ipsum',
      id: 'afd8yh4bhfsd8',
    },
  ],
  [
    {
      image: avatarDefaultImage.src,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius placeat quas ipsa officiis maiores, odit molestiae quasi rerum sapiente, autem culpa. Ullam recusandae voluptatibus neque.',
      username: '@lorem ipsum',
      name: 'Lorem Ipsum',
      id: 'asd9f8y5b',
    },
    {
      image: avatarDefaultImage.src,
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum dignissimos, beatae recusandae, tempora in et quaerat corrupti ea deleniti exercitationem rem illo ex reprehenderit perferendis molestiae fugiat aliquam adipisci laudantium velit, provident voluptas minima. Sit voluptatum placeat repudiandae rerum laborum officia, facilis tenetur id soluta sed, quae animi ad repellat doloribus voluptate molestiae cupiditate? Facere labore assumenda accusamus necessitatibus laborum veritatis numquam molestiae, illum repellendus incidunt consequuntur cumque velit, repellat maxime. Molestias a ipsa nostrum pariatur deserunt ea corporis atque dolorum, architecto quaerat nihil odit nobis sint ullam sed dolore recusandae enim quod, deleniti expedita aspernatur adipisci est! Dicta, consequatur.',
      username: '@lorem ipsum',
      name: 'Lorem Ipsum',
      id: 'ad90h4fs',
    },
  ],
];

const SWIPER_CONFIG = {
  spaceBetween: 10,
  speed: 1000,
  autoHeight: true,
  loop: true,
  autoplay: {
    waitForTransition: false,
    delay: 4000,
  },
};

const Testimonial = (): JSX.Element => {
  return (
    <section
      className="bg-gray-100 pt-10 pb-10 overflow-hidden"
      id="testimonials"
    >
      <h3 className="font-bold text-4xl text-center mb-8">
        What users say about us
      </h3>
      <Swiper {...SWIPER_CONFIG} slidesPerView="auto" centeredSlides>
        {TESTIMONIALS_DATA.map((item) => (
          <div key={item[0].id}>
            <SwiperSlide>
              {item.map(({ image, text, name, username, id }) => (
                <TestimonialCard
                  image={image}
                  text={text}
                  name={name}
                  key={id}
                  username={username}
                />
              ))}
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
