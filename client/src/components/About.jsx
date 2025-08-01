import React from 'react'
import { useSelector } from 'react-redux'
import tg from '../assets/tg-contact.webp'
import insta from '../assets/insta.png'
import youtube from '../assets/youtube.png'
import fb from '../assets/fb.png'
import aao from '../assets/aao.jpg'

function About() {

    const app = useSelector((state) => state.app);

    const bio = {
        en: "Born in Moscow, Russia. Now living and working in Merida, Mexico. ''Characterized by his expressive style full of symbolism with a great sarcastic touch Alexander since his arrival to the country is participating in a very active way in the artistic life of the state of Yucatan where he lives as well as nationally and internationally''. Formal studies at the School of Plastic Arts in Moscow. Graduated from the Moscow Tchaikovsky Conservatory as an oboist. His work can be found in private collections and galleries in Mexico, Russia, Ukraine, USA, Portugal, among others. Being also the musician and teacher, he has worked a lot in the field of stage design. His works were chosen to participate in biennials and other contests.",
        es: "Nacido en Moscú, Rusia, llega para quedarse en Mérida Yucatán en 2002. ''Caracterizado por su estilo expresivo lleno de simbolismo con un gran toque sarcástico Alexander desde su llegada al país está participando de forma muy activa en la vida artística del estado de Yucatán donde radica y a nivel nacional e internacional''. Realizó estudios formales en Escuela de Artes Plásticas de Moscú. También graduó en Conservatorio Tchaikovski de Moscú como músico oboísta. 1991 Tercer lugar en el Concurso de jóvenes pintores ''Comics'' (Moscú). Sus trabajos se encuentran en colecciones privadas en México, Rusia, Ucrania, EUA, Portugal entre otras. Siendo además el músico y profesor, ha trabajado mucho en el ámbito de la escenografía. Su obra ha estado presente en algunas obras musicales y teatrales. Sus obras fueron elegidas para su participación en diferentes bienales y otros certámenes.",
        ru: "Родился в Москве. С 2002 живет и работает в Мериде, Мексика. ''Отличающийся своим экспрессивным стилем, наполненным символизмом, сдобренным изрядной долей сарказма, Александр с момента его приезда в Мериду активно участвует в художественной жизни города и штата, где он поселился, Мексики в целом и на международном уровне''. Его работы находятся в частных собраниях в Мексике, России, Украине, США, Португалии. Принимал участие в создании сценического оформления многочисленных музыкальных и театральных представлений. Его произведения были не раз отобраны для участия в различных биеннале и других конкурсах."
    }


    return (
        <>
            {app.language &&
                <div className='border-[4px] flex flex-col items-center select-none'>

                    <div className='flex w-1/2'>
                        <img className='rounded-xl' src={aao} alt="" draggable="false" />
                        <div className='border pl-8 text-justify'>{bio[app.language]}</div>
                    </div>

                    <div>

                        <div className='flex gap-4 w-fit p-2 border'>
                            <img
                                className='w-40 cursor-pointer'
                                src={tg}
                                alt="telegram"
                            />
                            {/* <img
                                className='w-40 cursor-pointer'
                                src={tg}
                                alt="whatsup"
                            /> */}
                        </div>

                        <div className='flex gap-4 w-fit p-2 border'>
                            <img
                                className='w-12 cursor-pointer hover:opacity-80 duration-300'
                                src={fb}
                                alt="facebook"
                            />
                            <img
                                className='w-12 cursor-pointer hover:opacity-80 duration-300'
                                src={insta}
                                alt="instagram"
                            />
                            <img
                                className='w-12 cursor-pointer hover:opacity-80 duration-300'
                                src={youtube}
                                alt="youtube"
                            />
                        </div>

                    </div>

                    <form action="">
                        <div>FORM</div>
                    </form>

                </div>

            }



        </>
    )
}

export default About