import React from 'react';
import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from 'react-lazy-load-image-component';

// import Custom Components
import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { fadeInUpShorter, fadeInRightShorter, fadeInDownShorter, blurIn, fadeInLeftShorter } from '~/utils/data/keyframes';
import { introSlider } from '~/utils/data/carousel';

function IntroSection() {
    return (
        <section className="intro-section mb-6">
            <OwlCarousel adClass="owl-theme owl-dot-inner owl-dot-white intro-slider animation-slider mb-4" options={ introSlider }>
                <div className="banner banner-fixed intro-slide1">
                    <figure style={ { backgroundColor: "#ffc74e" } }>
                        <img
                            src="./images/home/slides/1.jpg"
                            alt="intro-banner"
                            width="880"
                            height="474"
                            style={ { backgroundColor: "#ffc74e" } }
                            effect="opacity"
                        />
                    </figure>
                    <div className="banner-content">
                        <Reveal keyframes={ fadeInDownShorter } delay={ 800 } duration={ 1000 }>
                            <h4 className="banner-subtitle text-white font-weight-semi-bold lh-1 ls-normal">
                                New Arrivals!</h4>
                        </Reveal>

                        <Reveal keyframes={ fadeInDownShorter } delay={ 800 } duration={ 1000 }>
                            <h2 className="banner-title mb-7 text-uppercase ls-l lh-1">
                                T-shirt From <span className="text-white">$19.99</span></h2>
                        </Reveal>

                        <Reveal keyframes={ fadeInDownShorter } delay={ 800 } duration={ 1000 } className="p-relative" style={ { zIndex: 2 } }>
                            <ALink href="/shop" className="btn btn-white btn-rounded">Shop Now</ALink>
                        </Reveal>

                        <Reveal keyframes={ fadeInRightShorter } duration={ 800 }>
                            <h2 className="banner-text text-white text-uppercase">men</h2>
                        </Reveal>

                        <figure className="intro1-image">
                            <Reveal keyframes={ fadeInLeftShorter } duration={ 800 }>
                                <img src="./images/home/slides/single.png" alt="Men" width="511"
                                    height="478" />
                            </Reveal>
                        </figure>
                    </div>
                </div>

                <div className="banner banner-fixed intro-slide2">
                    <figure>
                        <LazyLoadImage
                            src="./images/home/slides/2.jpg"
                            alt="banner" width="880"
                            height="474"
                            style={ { backgroundColor: "#fbfcfc" } }
                            effect="opacity" />
                    </figure>
                    <div className="banner-content y-50 text-right">
                        <Reveal keyframes={ fadeInDownShorter } duration={ 1000 }>
                            <h4 className="banner-subtitle text-body font-weight-semi-bold mb-3">Up To <strong className="text-primary">25% Off</strong></h4>
                        </Reveal>

                        <Reveal keyframes={ fadeInDownShorter } duration={ 1000 } delay={ 300 }>
                            <h2 className="banner-title text-uppercase ls-l">For Women’s</h2>
                        </Reveal>

                        <Reveal keyframes={ fadeInDownShorter } duration={ 1000 } delay={ 400 }>
                            <p className="font-weight-semi-bold ls-m text-body mb-6">Start at $12.00</p>
                        </Reveal>

                        <Reveal keyframes={ fadeInDownShorter } duration={ 1000 } delay={ 500 }>
                            <ALink href="/shop" className="btn btn-dark btn-rounded">Shop Now</ALink>
                        </Reveal>
                    </div>
                </div>

                <div className="banner banner-fixed intro-slide3">
                    <figure>
                        <LazyLoadImage
                            src="./images/home/slides/3.jpg"
                            alt="banner" width="880"
                            height="474"
                            style={ { backgroundColor: "#d3d4d5" } }
                            effect="opacity" />
                    </figure>
                    <div className="banner-content y-50 pb-3">
                        <Reveal keyframes={ fadeInUpShorter } duration={ 1000 }>
                            <h4 className="banner-subtitle font-weight-normal ls-m mb-1">Deals and
                                                    Promotions</h4>
                            <h2 className="banner-title text-uppercase mb-3 ls-l">Season Clothing</h2>
                            <h4 className="banner-price-info text-uppercase ls-l">Start at <strong
                                className="text-primary">$29.00</strong></h4>
                            <p className="text-dark lh-1 ls-m mb-4">* Get Plus Discount Buying Package
                                                </p>
                            <ALink href="/shop" className="btn btn-white btn-rounded">Shop Now</ALink>
                        </Reveal>
                    </div>
                </div>

            </OwlCarousel>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <Reveal keyframes={ fadeInUpShorter } delay={ 300 } triggerOnce>
                        <div className="category category-absolute category-badge">
                            <ALink href="#">
                                <figure>
                                    <LazyLoadImage
                                        src="./images/home/banners/1.jpg"
                                        width="430"
                                        height="189"
                                        alt="category"
                                        style={ { backgroundColor: "#eceef2" } }
                                        effect="opacity"
                                    />
                                </figure>
                            </ALink>

                            <div className="category-content">
                                <h4 className="category-name font-weight-bold text-uppercase">Accessories</h4>
                                <ALink href={ { pathname: "/shop", query: { category: "accessories" } } } className="btn btn-primary">Shop Now</ALink>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <div className="col-md-6 mb-4">
                    <Reveal keyframes={ fadeInUpShorter } delay={ 500 } triggerOnce>
                        <div className="category category-absolute category-badge">
                            <ALink href="#">
                                <figure>
                                    <LazyLoadImage
                                        src="./images/home/banners/2.jpg"
                                        width="580"
                                        height="249"
                                        alt="banner"
                                        style={ { backgroundColor: "#494442" } }
                                        effect="opacity"
                                    />
                                </figure>
                            </ALink>

                            <div className="category-content">
                                <h4 className="category-name font-weight-bold text-uppercase">watches</h4>
                                <ALink href={ { pathname: "/shop", query: { category: "watches" } } } className="btn btn-primary">Shop Now</ALink>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section >
    )
}

export default React.memo( IntroSection );