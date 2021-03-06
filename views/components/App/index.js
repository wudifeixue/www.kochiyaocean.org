import React from 'react'
import '../../3rd/fss'
import mesh from '../../3rd/mesh'

import Header from '../Header'
import MainPage from '../MainPage'
// import Footer from '../Footer'

import en_US from '../../intl/en-US'
import zh_CN from '../../intl/zh-CN'
import zh_TW from '../../intl/zh-TW'
import ja_JP from '../../intl/ja-JP'

import styles from './styles'

const intl = language => key => {
  switch (language) {
  case 'zh-CN':
    return zh_CN[key]
  case 'zh-TW':
    return zh_TW[key]
  case 'ja-JP':
    return ja_JP[key]
  default:
    return en_US[key]
  }
}

class App extends React.Component {
  switchLanguage(lang) {
    this.props.history.push(`/${lang}`)
  }

  getChildContext() {
    const locale = this.props.match.params.locale
    return {
      __: intl(locale),
      switchLanguage: (lang) => this.switchLanguage(lang),
      locale,
    }
  }

  componentDidMount() {
    mesh(this.ground)
  }

  render() {
    return (
      <div className={styles.container}>
        <div ref={node => this.ground = node} className={styles.ground} />
        <div className={styles.wrapper}>
          <Header />
          <MainPage />
          {/* <Footer /> */}
        </div>
      </div>
    )
  }
}

App.childContextTypes = {
  __: React.PropTypes.func,
  switchLanguage: React.PropTypes.func,
  locale: React.PropTypes.string,
}

App.contextTypes = {
  router: React.PropTypes.object,
}

export default App
