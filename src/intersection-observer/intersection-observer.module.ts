/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { IntersectionObserverDirective } from './intersection-observer.directive'

@NgModule({
  declarations: [IntersectionObserverDirective],
  imports: [CommonModule],
  exports: [IntersectionObserverDirective],
})
export class IntersectionObserverModule {}
