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
        en: 'Born in Moscow, Russia. Now living and working in Merida, Mexico. "Characterized by his expressive style full of symbolism with a great sarcastic touch Alexander since his arrival to the country is participating in a very active way in the artistic life of the state of Yucatan where he lives as well as nationally and internationally". Formal studies at the School of Plastic Arts in Moscow. Graduated from the Moscow Tchaikovsky Conservatory as an oboist. His work can be found in private collections and galleries in Mexico, Russia, Ukraine, USA, Portugal, among others. Being also the musician and teacher, he has worked a lot in the field of stage design. His works were chosen to participate in biennials and other contests',
        es: 'Nacido en Moscú, Rusia, llega para quedarse en Mérida Yucatán en 2002. "Caracterizado por su estilo expresivo lleno de simbolismo con un gran toque sarcástico Alexander desde su llegada al país está participando de forma muy activa en la vida artística del estado de Yucatán donde radica y a nivel nacional e internacional". Realizó estudios formales en Escuela de Artes Plásticas de Moscú. También graduó en Conservatorio Tchaikovski de Moscú como músico oboísta. 1991 Tercer lugar en el Concurso de jóvenes pintores "Comics" (Moscú). Sus trabajos se encuentran en colecciones privadas en México, Rusia, Ucrania, EUA, Portugal entre otras. Siendo además el músico y profesor, ha trabajado mucho en el ámbito de la escenografía. Su obra ha estado presente en algunas obras musicales y teatrales. Sus obras fueron elegidas para su participación en diferentes bienales y otros certámenes',
        ru: 'Родился в Москве. С 2002 живет и работает в Мериде, Мексика. "Отличающийся своим экспрессивным стилем, наполненным символизмом, сдобренным изрядной долей сарказма, Александр с момента его приезда в Мериду активно участвует в художественной жизни города и штата, где он поселился, Мексики в целом и на международном уровне". Его работы находятся в частных собраниях в Мексике, России, Украине, США, Португалии. Принимал участие в создании сценического оформления многочисленных музыкальных и театральных представлений. Его произведения были не раз отобраны для участия в различных биеннале и других конкурсах'
    }

    const expos = {
        en: 'III, IV y VII National Biennials of Visual Arts of Yucatán (2006, 2009, 2015). VII Biennial Joaquín Clausell 2007 (Campeche). Nacional Art Prize "José Atanasio Monroy" 2007 (Jalisco). Arte40 2ª edición 2010 (México DF). Limner Gallery Emerging Artists 2012 (NY US). Yucatán Arte Emergente Museo MACAY 2014. XVIII International Art Biennial of Cerveira (Portugal) 2015. X Bienal Puebla de los Ángeles 2015 (Honorific Mention). X Bienal Nacional Alfredo Zalce (Morelia) 2016. 3 Bienal de Arte CMUCH 2017. Bienal Internacional de Pintura México (San Luis Potosí 2017). FORCAZS (Certamen Zona Sur Movimiento Plástico) 2018. Bienal Nacional de pintura Julio Castillo Querétaro 2020',
        es: 'III, IV y VII National Biennials of Visual Arts of Yucatán (2006, 2009, 2015). VII Biennial Joaquín Clausell 2007 (Campeche). Nacional Art Prize "José Atanasio Monroy" 2007 (Jalisco). Arte40 2ª edición 2010 (México DF). Limner Gallery Emerging Artists 2012 (NY US). Yucatán Arte Emergente Museo MACAY 2014. XVIII International Art Biennial of Cerveira (Portugal) 2015. X Bienal Puebla de los Ángeles 2015 (Honorific Mention). X Bienal Nacional Alfredo Zalce (Morelia) 2016. 3 Bienal de Arte CMUCH 2017. Bienal Internacional de Pintura México (San Luis Potosí 2017). FORCAZS (Certamen Zona Sur Movimiento Plástico) 2018. Bienal Nacional de pintura Julio Castillo Querétaro 2020',
        ru: 'III, IV y VII National Biennials of Visual Arts of Yucatán (2006, 2009, 2015). VII Biennial Joaquín Clausell 2007 (Campeche). Nacional Art Prize "José Atanasio Monroy" 2007 (Jalisco). Arte40 2ª edición 2010 (México DF). Limner Gallery Emerging Artists 2012 (NY US). Yucatán Arte Emergente Museo MACAY 2014. XVIII International Art Biennial of Cerveira (Portugal) 2015. X Bienal Puebla de los Ángeles 2015 (Honorific Mention). X Bienal Nacional Alfredo Zalce (Morelia) 2016. 3 Bienal de Arte CMUCH 2017. Bienal Internacional de Pintura México (San Luis Potosí 2017). FORCAZS (Certamen Zona Sur Movimiento Plástico) 2018. Bienal Nacional de pintura Julio Castillo Querétaro 2020'
    }


    return (
        <>
            {app.language &&
                <div className='w-full flex flex-col justify-center items-center py-10 gap-10 bg-neutral-100'>

                    <div className='rounded-[28px] w-120 p-[12px] bg-white'>
                        <img className='rounded-[16px] w-full' src={aao} alt="aao-image" draggable="false" />
                    </div>


                    <div className='rounded-[28px] w-120 p-[12px] bg-white'>
                        <div className='rounded-[16px] flex flex-col justify-center bg-neutral-100'>
                            <div className='p-4 text-justify font-semibold text-neutral-600'>About Alexander Ovcharov</div>
                            <div className='p-4 text-justify text-sm text-neutral-600'>
                                {bio[app.language].split('.').map((str, ind) => <div key={`ind_${ind}`}>{`${str}.`}</div>)}
                            </div>
                            <div className='p-4 text-justify text-sm text-neutral-600 font-semibold'>
                                {expos[app.language].split('.').map((str, ind) => <div key={`ind_${ind}`}>{str}</div>)}
                            </div>
                        </div>
                    </div>

                    <div className='rounded-[28px] w-120 p-[12px] bg-white'>

                        <div className='bg-neutral-100 rounded-[16px] flex flex-col gap-4 py-4'>

                            <p className='text-[22px] font-semibold text-center'>Contact me</p>

                            <div className='flex justify-center'>
                                <img
                                    className='w-12 cursor-pointer hover:opacity-80 duration-300'
                                    src={fb}
                                    alt="facebook"
                                />
                                <img
                                    className='w-12 cursor-pointer hover:opacity-80 duration-300'
                                    src={youtube}
                                    alt="youtube"
                                />
                                <img
                                    className='w-12 cursor-pointer hover:opacity-80 duration-300'
                                    src={insta}
                                    alt="instagram"
                                />
                            </div>
                        </div>

                    </div>


                </div>
                // <div className='flex flex-col items-center select-none p-4 gap-8 bg-neutral-100'>

                //     <div className='flex flex-col w-120 gap-4 p-4 rounded-xl bg-white'>

                //         <img className='rounded-xl object-cover' src={aao} alt="aao-image" draggable="false" />


                //         <div className='rounded-xl flex flex-col justify-center bg-neutral-100'>
                //             <div className='p-4 text-justify text-sm text-neutral-600'>
                //                 {bio[app.language].split('.').map((str, ind) => <div key={`ind_${ind}`}>{`${str}.`}</div>)}
                //             </div>
                //             <div className='p-4 text-justify text-sm text-neutral-600 font-semibold'>
                //                 {expos[app.language].split('.').map((str, ind) => <div key={`ind_${ind}`}>{str}</div>)}
                //             </div>
                //         </div>

                //     </div>

                //     <div className='flex flex-col w-120 gap-4 p-4 rounded-xl bg-white p-4 border'>

                //         <div className='flex rounded-xl bg-neutral-100'>

                //             <p className='text-[22px] font-semibold text-center'>Contact me</p>

                // <img
                //     className='w-12 cursor-pointer hover:opacity-80 duration-300'
                //     src={fb}
                //     alt="facebook"
                // />
                // <img
                //     className='w-12 cursor-pointer hover:opacity-80 duration-300'
                //     src={youtube}
                //     alt="youtube"
                // />
                // <img
                //     className='w-12 cursor-pointer hover:opacity-80 duration-300'
                //     src={insta}
                //     alt="instagram"
                // />
                //         </div>
                //     </div>

                // </div>
            }
        </>
    )
}

export default About