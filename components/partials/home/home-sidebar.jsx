import { useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Reveal from 'react-awesome-reveal';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';
import SmallProduct from '~/components/features/product/product-sm';
import PostTen from '~/components/features/post/post-ten';

import { homeSidebar } from '~/utils/data/menu';
import { mainSlider7 } from '~/utils/data/carousel';
import { fadeIn } from '~/utils/data/keyframes';

export default function HomeSidebar( props ) {
    const { products, loading, posts } = props;

    useEffect( () => {
        window.addEventListener( 'resize', hideSidebar );

        return () => {
            window.removeEventListener( 'resize', hideSidebar );
        }
    }, [] )

    const toggleSidebar = () => {
        document.querySelector( 'body' ).classList.toggle( 'sidebar-active' );
    }

    const hideSidebar = () => {
        document.querySelector( 'body' ).classList.remove( 'sidebar-active' );
    }

    return (
        <aside className="col-xl-3 col-lg-4 sidebar sidebar-fixed sticky-sidebar-wrapper home-sidebar">
            <div className="sidebar-overlay" onClick={ hideSidebar }>
                <ALink className="sidebar-close" href="#"><i className="d-icon-times"></i></ALink>
            </div>

            <ALink href="#" className="sidebar-toggle" onClick={ toggleSidebar }><i className="fas fa-chevron-right"></i></ALink>

            <div className="sidebar-content">
                <ul className="menu vertical-menu category-menu mb-4">
                    <li><ALink href="/shop" className="menu-title">Popular Categories</ALink></li>

                    {
                        homeSidebar.map( item =>
                            <li key={ 'home-sidebar-' + item.slug }>
                                <ALink href={ { pathname: '/shop', query: { category: item.slug } } }><i className={ item.icon }></i>{ item.title }</ALink>
                            </li>
                        )
                    }

                    <li><ALink href="/shop" className="menu-title mt-1">Today Coupon Deals</ALink></li>

                    <li>
                        <ALink href={ { pathname: '/shop', query: { category: 'backpacks-and-fashion-bags' } } }>
                            <i className="d-icon-card"></i>Backpacks &amp; Fashion bags</ALink>
                    </li>

                    <li>
                        <ALink href="/shop">
                            <i className="d-icon-card"></i>Daily Deals</ALink>
                    </li>
                </ul>

                <div className="banner banner-fixed overlay-zoom overlay-dark">
                    <figure>
                        <LazyLoadImage src="./images/home/banner2.jpg" width="280" height="312"
                            alt="banner" style={ { backgroundColor: "#26303c" } } effect="opacity" />
                    </figure>
                    <div className="banner-price-info font-weight-bold text-white text-uppercase">
                        20-22<sup>th</sup> April</div>
                    <div className="banner-content text-center w-100">
                        <h4
                            className="banner-subtitle d-inline-block bg-primary font-weight-semi-bold text-uppercase">
                            Ultimate Sale</h4>
                        <h3
                            className="banner-title ls-m lh-1 text-uppercase text-white font-weight-bold">
                            Up
                                                to 70%</h3>
                        <p className="mb-4 font-primary text-white lh-1">Discount Selected Items</p>
                    </div>
                </div>

                {
                    loading ?
                        <div className="widget widget-products border-no">
                            <h4 className="widget-title">Popular Products</h4>

                            <OwlCarousel adClass="owl-nav-top" options={ mainSlider7 }>
                                <div className="products-col">
                                    {
                                        [ 1, 2, 3 ].map( ( item ) =>
                                            <div className="skel-pro-list mb-4" key={ 'small-skel-' + item }></div>
                                        )
                                    }
                                </div>

                                <div className="products-col">
                                    {
                                        [ 1, 2, 3 ].map( ( item ) =>
                                            <div className="skel-pro-list mb-4" key={ 'small-skel-one-' + item }></div>
                                        )
                                    }
                                </div>
                            </OwlCarousel>
                        </div>
                        :
                        <div className="widget widget-products border-no">
                            <h4 className="widget-title font-weight-bold">Popular Products</h4>

                            <div className="widget-body">
                                <OwlCarousel adClass="owl-nav-top" options={ mainSlider7 }>
                                    <div className="products-col">
                                        {
                                            products.slice( 0, 3 ).map( item => (
                                                <SmallProduct product={ item } key={ 'small-' + item.slug } isReviewCount={ false } />
                                            ) )
                                        }
                                    </div>

                                    <div className="products-col">
                                        {
                                            products.slice( 3, 6 ).map( item => (
                                                <SmallProduct product={ item } key={ 'small-' + item.slug } isReviewCount={ false } />
                                            ) )
                                        }
                                    </div>
                                </OwlCarousel>
                            </div>
                        </div>
                }
                {
                    loading ?
                        ''
                        :
                        <Reveal keyframes={ fadeIn } delay={ 300 } triggerOnce>
                            <div className="widget widget-blog border-no">
                                <h4 className="widget-title text-capitalize font-weight-bold">Latest Blog</h4>

                                <div className="widget-body">
                                    <OwlCarousel adClass="owl-nav-top" options={ mainSlider7 }>
                                        {
                                            posts.slice( -4 ).map( ( item, index ) =>
                                                <PostTen post={ item } key={ "sidebar-post-" + index }></PostTen>
                                            )
                                        }
                                    </OwlCarousel>
                                </div>
                            </div>
                        </Reveal>
                }

                <Reveal keyframes={ fadeIn } delay={ 300 } triggerOnce>
                    <div className="widget widget-testimonial border-no">
                        <h4 className="widget-title text-capitalize font-weight-bold">Testimonials</h4>

                        <div className="widget-body">
                            <OwlCarousel adClass="owl-nav-top" options={ mainSlider7 }>
                                <div className="testimonial">
                                    <blockquote className="comment">I am keeping my fingers on the pulse by
                                    Riode every year! It gives me good sense of trend. My family
                                                        likes it, too.</blockquote>
                                    <div className="testimonial-info">
                                        <figure className="testimonial-author-thumbnail">
                                            <img src="./images/home/agent.png" alt="user"
                                                width="40" height="40" />
                                        </figure>
                                        <cite className="font-weight-semi-bold text-capitalize">
                                            Casper Dalin
                                                            <span>Investor</span>
                                        </cite>
                                    </div>
                                </div>
                                <div className="testimonial">
                                    <blockquote className="comment">I am keeping my fingers on the pulse by
                                    Riode every year! It gives me good sense of trend. My family
                                                        likes it, too.</blockquote>
                                    <div className="testimonial-info">
                                        <figure className="testimonial-author-thumbnail">
                                            <img src="./images/home/agent.png" alt="user"
                                                width="40" height="40" />
                                        </figure>
                                        <cite>
                                            Casper Dalin <span>Investor</span>
                                        </cite>
                                    </div>
                                </div>

                            </OwlCarousel>
                        </div>
                    </div>
                </Reveal>
            </div>
        </aside>
    )
}