import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Bitstream } from '../../../core/shared/bitstream.model';
import { MediaViewerItem } from '../../../core/shared/media-viewer-item.model';
import { MockBitstreamFormat1 } from '../../../shared/mocks/item.mock';

import { MediaViewerImageComponent } from './media-viewer-image.component';

import { of as observableOf } from 'rxjs';

describe('MediaViewerImageComponent', () => {
  let component: MediaViewerImageComponent;
  let fixture: ComponentFixture<MediaViewerImageComponent>;

  const mockBitstream: Bitstream = Object.assign(new Bitstream(), {
    sizeBytes: 10201,
    content:
      'https://dspace7.4science.it/dspace-spring-rest/api/core/bitstreams/cf9b0c8e-a1eb-4b65-afd0-567366448713/content',
    format: observableOf(MockBitstreamFormat1),
    bundleName: 'ORIGINAL',
    _links: {
      self: {
        href:
          'https://dspace7.4science.it/dspace-spring-rest/api/core/bitstreams/cf9b0c8e-a1eb-4b65-afd0-567366448713',
      },
      content: {
        href:
          'https://dspace7.4science.it/dspace-spring-rest/api/core/bitstreams/cf9b0c8e-a1eb-4b65-afd0-567366448713/content',
      },
    },
    id: 'cf9b0c8e-a1eb-4b65-afd0-567366448713',
    uuid: 'cf9b0c8e-a1eb-4b65-afd0-567366448713',
    type: 'bitstream',
    metadata: {
      'dc.title': [
        {
          language: null,
          value: 'test_word.docx',
        },
      ],
    },
  });

  const mockMediaViewerItems: MediaViewerItem[] = Object.assign(
    new Array<MediaViewerItem>(),
    [
      { bitstream: mockBitstream, format: 'image', thumbnail: null },
      { bitstream: mockBitstream, format: 'image', thumbnail: null },
    ]
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaViewerImageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaViewerImageComponent);
    component = fixture.componentInstance;
    component.galleryOptions = [new NgxGalleryOptions({})];
    component.galleryImages = component.convertToGalleryImage(
      mockMediaViewerItems
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
