import React, { PureComponent } from 'react'
import Stream from '../common/Stream'
import AWrap from '../common/AWrap'
import {
  InfoArticle,
  InfoLine,
  InfoStreamMask,
  InfoStreamInner
} from './AboutPose'
import './About.scss'

class AboutComponent extends PureComponent {
  render () {
    return (
      <div className="i">
        <div className="i-stream-wrap">
          <InfoStreamMask className="oh">
            <InfoStreamInner>
              <Stream speed={2.5}>
                <h1 className="i-header">LITTLEMILK.STUDIO @</h1>
              </Stream>
              <Stream speed={4}>
                <h1 className="i-header">LITTLEMILK.STUDIO @</h1>
              </Stream>
              <Stream speed={7}>
                <h1 className="i-header">LITTLEMILK.STUDIO @</h1>
              </Stream>
              <Stream speed={3.2}>
                <h1 className="i-header">LITTLEMILK.STUDIO @</h1>
              </Stream>
              <Stream speed={2.1}>
                <h1 className="i-header">LITTLEMILK.STUDIO @ </h1>
              </Stream>
            </InfoStreamInner>
          </InfoStreamMask>
        </div>
        <InfoArticle className="i-info">
          <div className="i-bio">
            <div className="i-bio-head oh">
              <InfoLine>PROFILE</InfoLine>
            </div>
            <div className="oh">
              <InfoLine>Creative Web Studio of Max Yinger.</InfoLine>
            </div>
            <div className="oh">
              <InfoLine>Interaction Design / Development.</InfoLine>
            </div>
            <div className="oh">
              <InfoLine>Fort Collins, CO.</InfoLine>
            </div>
          </div>
          <ul className="i-socials">
            <li className="i-social oh">
              <InfoLine>
                <AWrap href="#">github</AWrap>
              </InfoLine>
            </li>
            <li className="i-social oh">
              <InfoLine>
                <AWrap href="#">codepen</AWrap>
              </InfoLine>
            </li>
            <li className="i-social oh">
              <InfoLine>
                <AWrap href="#">dribbble</AWrap>
              </InfoLine>
            </li>
            <li className="i-social oh">
              <InfoLine>
                <AWrap href="#">Get In Touch</AWrap>
              </InfoLine>
            </li>
          </ul>
        </InfoArticle>
      </div>
    )
  }
}

export default AboutComponent
